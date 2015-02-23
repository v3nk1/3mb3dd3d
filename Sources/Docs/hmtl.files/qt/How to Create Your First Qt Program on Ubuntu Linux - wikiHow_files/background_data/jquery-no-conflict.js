window["jq$"] = jQuery.noConflict(true);
if (typeof window["jQuery"] == "undefined") {
    window["jQuery"] = window["jq$"];
}
