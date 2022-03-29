class SaveFailError extends Error {
  constructor (modelName) {
    const message = `An error occurred while saving ${modelName}`
    super(message)
  }
}

export {
  SaveFailError
}
