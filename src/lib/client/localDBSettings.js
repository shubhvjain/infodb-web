
// localDBSetting or LDBS

const local_key = "ldbs_settings"


export const LDBS_get = ()=>{
  let blank_obj = {
    dbs :{},
    created : ""
  }
  let l_obj = localStorage.getItem(local_key)
  if(l_obj){
    return l_obj 
  }else{
    // save new and return 
    let new_obj = {... blank_obj}
    new_obj["created"] = Math.floor(Date.now() / 1000)
    localStorage.setItem(local_key,new_obj)
    return new_obj
  }
}

// let LDBS_set = ()=>{return 1}

export const LDBS_check_DB_exists =  (db_name)=>{
  let obj = LDBS_get()
  return db_name in obj["dbs"]
}