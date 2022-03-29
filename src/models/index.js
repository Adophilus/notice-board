/*
function initModel (modelPath, db) {
  const model = import(modelPath)

  return function (args) {
    return new model(db, args)
  }
}
*/

const init = async (db) => {
  /*
  return {
    Notice: initModel("./src/models/Notice.js", db),

    Admin: initModel("./Admin.js", db),
    Student: initModel("./Student.js", db),
    User: initModel("./User.js", db)
  }
  */
  return {}
}

export {
  init
}
