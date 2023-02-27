const convertAddonToForm = (addon, productData = []) => {
    return addon.map(item => {
        const hasItem = productData.find(item1 => item1.id === item.id)
        if (hasItem) {
            return ({ ...item, isActive: true, price: hasItem.price })
        } else {
            return ({ ...item, isActive: false, price: 0 })
        }
    })
}


export {convertAddonToForm}
