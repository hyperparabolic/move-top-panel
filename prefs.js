'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {
}

function buildMonitorOptions(monitorCount) {
    let strOptions = [];
    for (let i = 0; i < monitorCount; i++) {
        strOptions.push(i.toString());
    }
    return strOptions;
}

function buildPrefsWidget() {
    this.settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.move-top-panel');

    let prefsWidget = new Gtk.Grid({
        column_spacing: 12,
        row_spacing: 12,
        visible:true,
    });

    let title = new Gtk.Label({
        label: `<b>${Me.metadata.name} Preferences</b>`,
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, 0, 2, 1);

    let toggleLabel = new Gtk.Label({
        label: 'Select Monitor:',
        halign: Gtk.Align.START,
        visible: true
    });
    prefsWidget.attach(toggleLabel, 0, 1, 1, 1);

    let monitorOptions = buildMonitorOptions(this.settings.get_int('monitor-count'));
    let dropdown = Gtk.DropDown.new_from_strings(monitorOptions);
    dropdown.selected = this.settings.get_int('monitor-index');
    prefsWidget.attach(dropdown, 1, 1, 1, 1);

    // Bind the switch to the `show-indicator` key
    this.settings.bind(
        'monitor-index',
        dropdown,
        'selected',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Return our widget which will be added to the window
    return prefsWidget;
}