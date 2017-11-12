"use strict";
exports.__esModule = true;
var normalizr_1 = require("normalizr");
exports["default"] = function (jsonSchema) {
    var definitions = jsonSchema.definitions;
    var schemaHolder = {};
    Object.keys(definitions).map(function (modelKey) {
        schemaHolder[modelKey] = {};
    });
    Object.keys(definitions).map(function (modelKey) {
        var model = definitions[modelKey];
        Object.keys(model.properties).map(function (propsKey) {
            var props = model.properties[propsKey];
            if (props.type == "array") {
                if (props.items["$ref"] != null) {
                    var propsName = props.items["$ref"].replace("#/definitions/", "");
                    schemaHolder[modelKey][propsKey] = {
                        type: "array",
                        ref: propsName
                    };
                }
            }
            else if (props["$ref"] != null) {
                var propsName = props["$ref"].replace("#/definitions/", "");
                schemaHolder[modelKey][propsKey] = {
                    type: "object",
                    ref: propsName
                };
            }
        });
    });
    return defineNormarizer(schemaHolder, {}, 0);
};
var defineNormarizer = function (notDone, schemaInstance, count) {
    if (count > 100) {
        throw new Error("overflow データの読み取りに問題があります");
    }
    var yetCreated = {};
    Object.keys(notDone).map(function (key) {
        var arrayProps = notDone[key];
        if (Object.keys(arrayProps).length == 0) {
            if (schemaInstance[key] == null) {
                schemaInstance[key] = new normalizr_1.schema.Entity(key);
            }
        }
        else {
            var isCreatable = Object.keys(arrayProps).filter(function (_key) { return schemaInstance[arrayProps[_key].ref] == null; }).length == 0;
            if (isCreatable) {
                var p_1 = {};
                Object.keys(arrayProps).map(function (propertyName) {
                    var type = arrayProps[propertyName].type;
                    var ref = arrayProps[propertyName].ref;
                    if (type == "object") {
                        p_1[propertyName] = schemaInstance[ref];
                    }
                    else if (type == "array") {
                        p_1[propertyName] = [
                            schemaInstance[ref]
                        ];
                    }
                });
                schemaInstance[key] = new normalizr_1.schema.Entity(key, p_1);
            }
            else {
                yetCreated[key] = arrayProps;
            }
        }
    });
    if (Object.keys(yetCreated).length > 0) {
        defineNormarizer(yetCreated, schemaInstance, count + 1);
    }
    return schemaInstance;
};
