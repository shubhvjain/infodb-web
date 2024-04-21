/* eslint-disable no-unused-vars */
import Ajv from 'ajv';
// the "db" class
// export default
export class db {
	constructor(dbname) {
		// Constructor logic
		// PouchDB.plugin(plugin);

		if (!dbname) {
			throw new Error('Database name is required. None was provided');
		}
		this.init();
		this.db = new window['PouchDB'](dbname);
	}
	init() {
		// run from the constructor to initialize the class with required internal variables
    this.valid_system_settings = {
      db_system_log: {
				schema: {
					type: 'object',
					properties: {
						logs: {
							type: 'array',
							items: {
								type: 'object',
                additionalProperties: true,
							},
              "minItems": 0
						}
					},
				},
        settings: {
          default_data: { logs: [] },
          editable_fields:["logs"]
        }
			},
      tags:{
        schema: {
					type: 'object',
					properties: {
						logs: {
							type: 'array',
              maxItems: 100,
              minItems: 0,
              uniqueItems: true,
							items: {
								type: 'object',
                properties:{
                  name:{
                    type:"string",
                    minLength: 5,  
                    maxLength: 500,
                    pattern:"^[a-zA-Z][a-zA-Z0-9-_.]*$",
                  },
                  note:{
                    type:"string"
                  }
                }

							},
              
						}
					},
				},
        settings: {
          default_data: { tags: [] },
          editable_fields:["tags"]
        }
      }
    }
    this.valid_schema_doc_schema = {
      name:"schema_doc",
      schema:{
        type:"object",
        properties:{
          name:{
            type:"string",
            minLength: 5,  
            maxLength: 50,
            pattern:"^[a-zA-Z][a-zA-Z0-9_]*$",
          },
          properties:{
            type: "object",
            additionalProperties: true,
            minProperties: 1,
            maxProperties: 20
          },
          settings:{
            type: "object",
            additionalProperties: true,
            properties:{
              primary_key:{
                type:"array",
                default:[],
                items:{
                  type:"string",
                },
                maxItems:10
              },
              editable_fields:{
                type:"array",
                default:[],
                items:{
                  type:"string"
                },
                maxItems:20
              },
              single_record:{
                type:"boolean",
                default:false,
                description:"If set, only a single records with this schema will be allowed to insert in the database"
              }
            }
          }
          
        },
        required:["name","schema","setting"]
      },
      settings:{
        primary_key:["name"],
        editable:["schema","settings"]
      }
    }
	}
	async initialize_db() {
		// run it once when the database is created
		// create log document
		this.log({ message: 'Database created' });
		// create required setting documents
		// create default documents
		// add indexes
	}
	// reinitialize_db() {
	// 	// a utility function to re initialized database is some new version of the software is available
	// }

  async get_setting_doc(setting_name){
    // first check if this setting name exists 
    // if not create a new blank document and return it 
    let query = {"selector":{"schema":"setting","data":{"name":setting_name}}}
    console.log(query)
    let search = await this.db.find(query)
    console.log(search)
    if (search["docs"].length == 0){
      console.log('111')
      // generate a new doc and return it
      let setting_details = this.valid_system_settings[setting_name]
      console.log(setting_details)
      let blank_data = {...setting_details["settings"]["default_data"]}
      blank_data["name"] = setting_name
      let blank_record = this.get_blank_doc("setting")
      console.log(blank_record)
      blank_record["data"] = blank_data
      blank_record["meta"]["system"] = true
      let new_id = await this.insert_doc(blank_record)
      let a = await this.get(new_id["id"])
    }else {
      return search["docs"][0]
    }
  }

  async get_schema_doc(schema_name,second="") {
    // the schema_doc is of the forms  : {schema,setting,name}
    if(schema_name=="setting"){
      if(second==""){
        throw new Error("when fetching setting schema, second argument (key name) is required ")
      }
      let s_data = this.valid_system_settings[second]
      s_data["name"]="setting"
      s_data["schema"]["properties"]["name"] = {
        type:"string",
        minLength: 5,  
        maxLength: 50,
        pattern:"^[a-zA-Z][a-zA-Z0-9_]*$",
      }
      s_data["schema"]["required"] = ["name"]
      s_data["settings"]["primary_key"]= ["name"]

      return s_data
    }
    else if(schema_name=="schema_doc"){
      return this.valid_schema_doc_schema
    }
    else{
      let s_doc = await db.find({ selector: { schema: 'schema_doc', 'data.name': schema_name }});
			if (s_doc["docs"].length==0) {
        throw new Error('Schema not defined in the database');
			} 
      return s_doc['docs'][0]["data"];
    }
	}

  validate_data(schema_obj,data_obj){
    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
		const validate = ajv.compile(schema_obj);
		const valid = validate(data_obj);
		if (!valid) {
			console.log(validate.errors);
			throw new Error(validate.errors);
		}
  }

  async search(criteria){
    if(!criteria["schema"]){
      throw new Error("The search criteria must contain the schema")
    }

  }

  async duplicate_doc_check(schema_obj,data_obj){
    let doc_obj = { schema: { $eq: schema_obj['name'] } };
		for (let key in schema_obj["settings"]['primary_key']) {
			doc_obj['data.' + key] = { $eq: data_obj[key] };
		}
		let doc_check = { selector: doc_obj };
		let docs_found = await this.db.find(doc_check);
		if (docs_found['docs'].length > 0) {
			throw new Error("Document already exists")
		}
  }
  validate_new_schema_object(schema_name,record_data){
    // check if the name is not from the system defined schemas , check the values of settings fields etc....
  }

  async insert_pre_check(schema_name,record_data){
    // read schema
    console.log(schema_name)
    let secondArg = ""
    if(schema_name=="setting"){
      secondArg = record_data["name"]
    }
    let schemaDoc = await this.get_schema_doc(schema_name,secondArg)
    // validate data
    this.validate_data(schemaDoc["schema"],record_data)
    // todo generate a new doc with default values when validating obj
    if(schema_name=="schema_doc"){
      this.validate_new_schema_object(schema_name,record_data)
    }
    // check if already exists
    this.duplicate_doc_check(schemaDoc,record_data)

  }
  async insert_doc(data){
    console.log("333333")
    console.log(data)
    await this.insert_pre_check(data["schema"],data["data"])
    let new_rec = await this.db.post(data)
    console.log(new_rec)
    return {id:new_rec["id"]}
  }
  async insert(schema_name,data){
    await this.insert_pre_check(schema_name,data)
    let new_record = this.get_blank_doc()
    new_record["data"] = data
    let new_rec = await this.db.post(new_record)
    return {id:new_rec["id"]}
  }



	async log(stuff) {
		// to log something in the log record
		// let log_doc = await this.get_by_force({ schema: 'log' });
		// check : create a doc if it does not already exists
		// let log_obj = await this.get_system_doc('db_log', {});
		//console.log(log_obj);
    let log_obj = await this.get_setting_doc("db_system_log")
    console.log(log_obj)
    stuff["added_on"] = this.get_now_unix_timestamp()
    log_obj["data"]["logs"].push(stuff)
    // await 
	}

	async get(doc_id) {
    let doc = await this.db.get(doc_id)
    return doc
  }

  
  async insert_data(schema_name,data_object){
    // this takes in only the data object{} , generates the full records and then inserts 
    let schema = await this.get_schema(schema_name);
    this.validate_data(schema,data_object)
    await this.check_if_doc_exists();
  }
	
	async update(doc_id,rev_id,data_updates) {}
	async delete(doc_id) {}

	

	get_now_unix_timestamp() {
		const currentTimeMilliseconds = Date.now();
		return Math.floor(currentTimeMilliseconds / 1000);
	}

	get_blank_doc(schema_name) {
		let doc = {
			data: {},
			meta: {
				createdOn: this.get_now_unix_timestamp(),
				tags: []
			},
			schema: schema_name
		};
		return doc;
	}

	
}
