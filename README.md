# normarize-swagger

schema generator for [normalizr](paularmstrong/normalizr) by swagger/json schema.

## usage

```
import swaggerNormarizer from "normarize-swagger";

test(t => {
    const normilizeSetting = swaggerNormarizer(sampleJsonSchema);
    const normalizedData = normalize(sampleDataJson.example, normilizeSetting.humans);
});
```

schema & sample data
```
 const sampleJsonSchema =
    {
        "swagger": "2.0",
        "info": {
            "version": "",
            "title": "playground01",
            "description": ""
        },
        "paths": {},
        "definitions": {
            "human": {
                "title": "Human",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "speed": {
                        "type": "number"
                    },
                    "arms": {
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/arms"
                        }
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/item"
                        }
                    }
                },
                "required": [
                    "id",
                    "name",
                    "speed",
                    "arms",
                    "items"
                ]
            },
            "arms": {
                "title": "Arms",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "attack": {
                        "type": "integer"
                    },
                    "price": {
                        "$ref": "#/definitions/price"
                    }
                },
                "required": [
                    "id",
                    "name",
                    "attack",
                    "price"
                ]
            },
            "price": {
                "title": "Price",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "price": {
                        "type": "integer"
                    }
                },
                "required": [
                    "id",
                    "price"
                ]
            },
            "item": {
                "title": "Item",
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "item_type": {
                        "type": "integer"
                    },
                    "price": {
                        "$ref": "#/definitions/price"
                    }
                },
                "required": [
                    "id",
                    "item_type",
                    "price"
                ]
            },
            "humans": {
                "title": "Humans",
                "type": "object",
                "properties": {
                    "humans": {
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/human"
                        }
                    }
                },
                "required": [
                    "humans"
                ]
            }
        }
    }

const sampleDataJson =
    {
        "example": {
            "humans": [
                {
                    "id": 46724329,
                    "name": "et ad sit non Lorem",
                    "speed": -89732341,
                    "arms": [
                        {
                            "id": -3981952,
                            "name": "commodo null",
                            "attack": -18978701,
                            "price": {
                                "id": 63114064,
                                "price": -44429984
                            }
                        },
                        {
                            "id": 83336186,
                            "name": "labore adipisicing comm",
                            "attack": 76487197,
                            "price": {
                                "id": 16484264,
                                "price": 52852108
                            }
                        },
                        {
                            "id": -45330412,
                            "name": "ex culpa cupidatat nisi dolore",
                            "attack": -93922819,
                            "price": {
                                "id": -70437687,
                                "price": 60336961
                            }
                        }
                    ],
                    "items": [
                        {
                            "id": 31524891,
                            "item_type": -65025204,
                            "price": {
                                "id": -7716169,
                                "price": -10777821
                            }
                        },
                        {
                            "id": 30994464,
                            "item_type": 41652135,
                            "price": {
                                "id": 75971013,
                                "price": 38947278
                            }
                        },
                        {
                            "id": -72935767,
                            "item_type": 31782830,
                            "price": {
                                "id": -46947865,
                                "price": -50355682
                            }
                        },
                        {
                            "id": 547206,
                            "item_type": 35936131,
                            "price": {
                                "id": -12943343,
                                "price": 22499745
                            }
                        },
                        {
                            "id": -30853010,
                            "item_type": -64756983,
                            "price": {
                                "id": 35206247,
                                "price": 46101232
                            }
                        }
                    ]
                }
            ]
        }
    }



```
