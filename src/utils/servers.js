const convertToFormData = (form) => {
    const formData = new FormData()
    for (let key in form) formData.append(key, form[key])

    return formData
}

export {
    convertToFormData
}