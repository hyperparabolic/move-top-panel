'use strict';

const Gio = imports.gi.Gio;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const LM = Main.layoutManager;

class Extension {
    constructor() {
        this._indicator = null;
    }

    log_with_context(msg) {
        log(`${Me.metadata.name}: ${msg}`)
    }

    /*
        Settings menu cannot access layoutManager, persist information
        about monitors to gsettings on startup and on refresh
    */
    set_monitor_count() {
        let monitorCount = LM.monitors.length;
        this.log_with_context(`Setting monitor count: ${monitorCount}`);
        this.settings.set_int('monitor-count', monitorCount);
    }

    select_monitor() {
        let monitorIndex = this.settings.get_int('monitor-index');

        if (monitorIndex < 0 || monitorIndex >= LM.monitors.length) {
            return LM.primaryMonitor;
        }
        return LM.monitors[monitorIndex];
    }

    move_panel() {
        let monitor = this.select_monitor();
        LM.panelBox.x = monitor.x;
        LM.panelBox.y = monitor.y;
        LM.panelBox.width = monitor.width;
        LM.panelBox.visible = true;
    }

    refresh_state() {
        this.log_with_context('Refreshing...');
        this.set_monitor_count();
        this.move_panel();
    }

    enable() {
        this.log_with_context('Initializing extension.');
        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.move-top-panel');

        this.set_monitor_count();

        let indicatorName = `${Me.metadata.name} Indicator`;
        
        this._indicator = new PanelMenu.Button(0.0, indicatorName, false);
        
        let icon = new St.Icon({
            gicon: new Gio.ThemedIcon({name: 'user-desktop-symbolic'}),
            style_class: 'system-status-icon'
        });
        this._indicator.add_child(icon);
        this._indicator.connect('button-press-event', () => this.refresh_state());

        Main.panel.addToStatusArea(indicatorName, this._indicator);
        this.move_panel();
        this.settings.connect('changed::monitor-index', () => this.move_panel());
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}


function init() {
    return new Extension();
}
