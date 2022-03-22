import { readdir } from "fs"

export default {
  async init (db) {
    let model = {}
    let modelFiles = await readdir(".")
    for (let modelFile of modelFiles) {
      let _model = import(modelFile)(db)
      model[_model.name] = _model
    }
    return model
  }
}