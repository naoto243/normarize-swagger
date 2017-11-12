import { denormalize, schema , normalize} from 'normalizr';

export default (jsonSchema)=> {
    const definitions = jsonSchema.definitions;

    let schemaHolder : any = {};

    Object.keys(definitions).map(modelKey => {
        schemaHolder[modelKey] = {};
    });

    Object.keys(definitions).map(modelKey => {
        const model = definitions[modelKey];

        Object.keys(model.properties).map(propsKey => {
            const props = model.properties[propsKey];

            if (props.type == "array"){

                if (props.items["$ref"] != null){
                    const propsName = props.items["$ref"].replace("#/definitions/","");
                    schemaHolder[modelKey][propsKey] = {
                        type : "array",
                        ref : propsName
                    }
                }
            } else if (props["$ref"] != null ){
                const propsName = props["$ref"].replace("#/definitions/","");
                schemaHolder[modelKey][propsKey] = {
                    type : "object",
                    ref : propsName
                }
            }
        });
    });

    return defineNormarizer(schemaHolder , {} , 0);

}

const defineNormarizer =(notDone  , schemaInstance , count : number) => {
    if (count > 100){
        throw new Error("overflow データの読み取りに問題があります");
    }

    const yetCreated = {};
    Object.keys(notDone).map(key => {
        const arrayProps = notDone[key];
        if (Object.keys(arrayProps).length == 0){
            if (schemaInstance[key] == null){
                schemaInstance[key] = new schema.Entity(key);
            }
        } else {
            const isCreatable = Object.keys(arrayProps).filter(_key => schemaInstance[arrayProps[_key].ref] == null ).length == 0;
            if (isCreatable){
                let p : any = {}
                Object.keys(arrayProps).map(propertyName => {

                    const type = arrayProps[propertyName].type;
                    const ref = arrayProps[propertyName].ref;


                    if (type == "object"){
                        p[propertyName] = schemaInstance[ref];
                    } else if (type == "array"){
                        p[propertyName] = [
                            schemaInstance[ref]
                        ];
                    }
                });

                schemaInstance[key] = new schema.Entity(key , p);

            } else {
                yetCreated[key] = arrayProps;
            }
        }
    });

    if (Object.keys(yetCreated).length > 0){
        defineNormarizer(yetCreated , schemaInstance , count + 1);
    }

    return schemaInstance;

}
