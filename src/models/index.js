const init = async (db) => {
  // let model = {}
  // let modelFiles = await readdir(".")
  // for (let modelFile of modelFiles) {
  //   if (modelFile === "index.js")
  //     continue
  //   let _model = import(modelFile)(db)
  //   model[_model.name] = _model
  // }
  // return model

  return {
    User: (await import("./User.js")).default(db)
  }
}

export {
  init
}
