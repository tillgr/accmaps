import $ from 'jquery';

export function getOSM(map, callback) {
    let bounds = map.getBounds();
    let indoorQuery = "[timeout:25];" +
        "(nwr[indoor](" +
        bounds.getSouth() + "," +
        bounds.getWest() + "," +
        bounds.getNorth() + "," +
        bounds.getEast() + ");" +
        "nwr[building](" +
        bounds.getSouth() + "," +
        bounds.getWest() + "," +
        bounds.getNorth() + "," +
        bounds.getEast() + "););" +
        "(._;>;);" +
        "out;"
    $.get("http://overpass-api.de/api/interpreter?data=" + indoorQuery, callback);
}
