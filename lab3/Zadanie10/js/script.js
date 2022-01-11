"use strict";
(() => {
// Template strings
const menuItemTemplate = `
<input class="menu__checkbox menu__checkbox--reveal hidden" type="checkbox" name="submenu-reveal" id="submenu-{{CAT-ID}}">

<label for="submenu-{{CAT-ID}}" class="menu__label">
    <div class="menu__wrapper">
        <button class="button menu__button menu__button--open">
            <svg class="menu__icon">
                <use href="svg/icons.svg#icon-chevron-up"></use>
            </svg>
        </button>
        <div class="checkbox">
            <input class="checkbox__checkbox" type="checkbox" name="category" id="cat-{{CAT-ID}}">
            <label for="cat-{{CAT-ID}}" class="checkbox__check">
                <div></div>
            </label>
        </div>
        <span class="menu__text">{{CATEGORY}}</span>
        <div class="menu__counter">
            <span class="menu__counter--current">0</span>
            <span class="menu__counter--slash">/</span>
            <span class="menu__counter--max">{{MAX-COUNT}}</span>
        </div>
    </div>
</label>

<menu class="submenu"></menu>
`

const submenuItemTemplate = `
<label class="submenu__label">
    <div class="submenu__content">
        <div class="checkbox">
            <input class="checkbox__checkbox" type="checkbox" name="product" id="cat-{{CAT-ID}}-prod-{{PROD-ID}}">
            <div class="checkbox__check">
                <div></div>
            </div>
        </div>
        <span class="submenu__icon">{{ICON}}</span>
        <span class="submenu__text">{{NAME}}</span>
    </div>
    <div class="price">
        <div class="price__amount">
            <span class="price__number">{{PRICE}}</span>
            <span class="price__currency">{{CURRENCY}}</span>
        </div>
        <span class="price__slash">/</span>
        <div class="price__quantity">{{UNITS}}</div>
    </div>
</label>
`

const productItemTemplate = `
<article class="product">
    <figure class="product__figure">
        <div class="product__image">
            <span class="product__icon">{{ICON}}</span>
        </div>
    </figure>
    <section class="product__details">
        <header class="product__header">
            <h3 class="product__heading">{{NAME}}</h3>
        </header>

        <section class="product__info">
            <div class="product__description">
                <p class="product__text">{{DESCRIPTION}}</p>
            </div>
            <div class="product__price">
                <p class="product__price-text">Cena</p>
                <div class="price">
                    <div class="price__amount">
                        <span class="price__number">{{PRICE}}</span>
                        <span class="price__currency">{{CURRENCY}}</span>
                    </div>
                    <span class="price__slash">/</span>
                    <div class="price__quantity">{{UNITS}}</div>
                </div>
            </div>
        </section>
    </section>

    <footer class="product__footer">
        <form action="#" class="product__form">
            <button class="button product__button product__button--minus">-</button>
            <input class="product__quantity" type="number" name="price" id="price-cat-{{CAT-ID}}-prod-{{PROD-ID}}" min="0" max="999" value="1" data-value="1">
            <button class="button product__button product__button--plus">+</button>
        </form>

        <div class="product__summary">
            <p class="product__summary-text">Łącznie</p>
            <div class="price">
                <div class="price__amount">
                    <span class="price__number price__number--total">{{PRICE}}</span>
                    <span class="price__currency">{{CURRENCY}}</span>
                </div>
            </div>
        </div>
    </footer>
</article>
`

const categorySectionTemplate = `
<header class="section__header">
    <h3 class="section__heading">{{NAME}}</h3>
</header>
<ul class="section__products"></ul>
`

// Helper functions
const $  = selector => document.querySelector(selector)
const $a = selector => document.querySelectorAll(selector)

// DOM Selectors
const menuSectionEl = $('.menu')
const mainContentEl = $('.main__content')
const popupEl = $('.main__content .popup')

const summaryAmountInitialEl = $('.summary__amount--initial')
const summaryAmountDeliveryEl = $('.summary__amount--delivery')
const summaryAmountDiscountsEl = $('.summary__amount--discounts')
const summaryAmountTotalEl = $('.summary__amount--total')

// Class strings
const submenuClass = '.submenu'
const checkboxClass = '.checkbox__checkbox'
const menuItemClass = '.menu__item'
const submenuItemClass = '.submenu__item'
const checkboxDesignedClass = '.checkbox__check'
const counterCurrClass = '.menu__counter--current'
const counterMaxClass = '.menu__counter--max'
const sectionProductsClass = '.section__products'
const productItemClass = '.section__product'
const quantityBtnMinusClass = '.product__button--minus'
const quantityBtnPlusClass = '.product__button--plus'
const quantityInputClass = '.product__quantity'
const categorySectionClass = '.section'
const productTotalPriceClass = '.price__number--total'

const menuItemClassName = 'menu__item'
const submenuItemClassName = 'submenu__item'
const productItemClassName = 'section__product'
const partialCheckClassName = 'check'
const categorySectionClassName = 'section'

const visibleClassName = 'visible'

// Variables
const jsonUrls = [
    'http://localhost:3000/categories', // json-server --watch -p 3000 json/productsA.json
    'http://localhost:3001/categories', // json-server --watch -p 3001 json/productsB.json
    'http://localhost:3002/categories'  // json-server --watch -p 3002 json/productsC.json
]

let checkedCount = 0
let data = null

// Functions
/* 
 * Functions for JSON files loading
 */
const loadJsonFiles = callback => {
    const jsonObjs = []
    let counter = jsonUrls.length

    jsonUrls.forEach(url => {
        fetch(url)
            .then(res => res.json())
            .then(res => jsonObjs.push(res))
            .then(() => --counter || callback(jsonObjs))
    })
}

const mergeJSONObjects = objs => {
    const merged = []
    
    objs.forEach(obj => unpack(merged, obj))

    return merged
}

const createEntry = value => {
    if (value instanceof Array) return []
    if (value instanceof Object) return {}
    throw TypeError('Cannot create object field of type: ' + typeof value)
}

const findCorrespondingObject = (arr, obj, fn = (a, b) => a.name === b.name) => {
    for (let arrObj of arr) {
        if (fn(arrObj, obj)) return arrObj
    }
    return null
}

const unpack = (target, current) => { // Multidimensional arrays are not supported
    // If current object is an Array (target also must be an array),
    // we look for objects to update in the target array
    if (current instanceof Array && target instanceof Array) {
        // Look for an object which should be updated
        current.forEach(obj => {
            const targetObj = findCorrespondingObject(target, obj)
            // If an object to update was found, update it
            if (targetObj !== null) unpack(targetObj, obj)
            // Otherwise, there is no object which should be updated, so add
            // a copy of the current obj object to the target array
            else target.push(JSON.parse(JSON.stringify(obj)))
        })
    // If the current object is an Object (but not an Array), we will loop
    // over its entries and try to update the target object
    } else if (current instanceof Object && target instanceof Object) {
        Object.entries(current).forEach(([key, value]) => {
            // If a value is either an Array or an Object
            if (value instanceof Object) {
                if (target[key] === undefined) target[key] = createEntry(value)
                unpack(target[key], value)
            // If a value is not an Object instance, we can finish recursion
            } else {
                target[key] = value
            }
        })
    // In other cases types of target and current objects aren't proper, so we
    // cannot merge two objects
    } else {
        throw TypeError(`Unsupported input data types. Expected Object or Array, got: ${typeof target} and ${typeof current}`)
    }
}

/* 
 * Classes to keep DOM elements sorted
 */
class TreeNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.parent = this.right = this.left = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    insert(key, value) {
        const node = new TreeNode(key, value)
        if (!this.root) this.root = node
        else {
            let curr = this.root
            while (true) {
                // Enter the right subtree if a key of a value inserted is
                // greater than the key of the current BST node
                if (node.key > curr.key) {
                    if (curr.right) curr = curr.right
                    else {
                        curr.right = node
                        node.parent = curr
                        break
                    }
                }
                // Enter the left subtree if a key of a value inserted is
                // lower than the key of the current BST node
                else if (node.key < curr.key) {
                    if (curr.left) curr = curr.left
                    else {
                        curr.left = node
                        node.parent = curr
                        break
                    }
                }
                // Return null if a node with the same key already exists
                // (We won't change its value)
                else return null
            }
        }
        // Return a node which was inserted
        return node
    }

    find(key) {
        let curr = this.root
        while (curr) {
            // Enter the left subtree
            if (key < curr.key) curr = curr.left
            // Enter the right subtree
            else if (key > curr.key) curr = curr.right
            // Return a node which was found
            else return curr
        }
        // If no node of the specified key was found, return null
        return null
    }

    remove(key) {
        // Find a node which will be removed
        const node = this.find(key)
        /// Return null if no node with the specified key was found
        if (!node) return null
        // Remove a node and fix a BST
        this._removeNode(node)
        return node
    }

    successor(node) {
        if (node.right) return this.minChild(node.right)
        while (node.parent) {
            if (node.parent.left === node) return node.parent
            node = node.parent
        }
        return null
    }
        
    predecessor(node) {
        if (node.left) return this.maxChild(node.left)
        while (node.parent) {
            if (node.parent.right === node) return node.parent
            node = node.parent
        }
        return null
    }

    minChild(node) {
        while (node.left) node = node.left
        // Return a node of the minimum key
        return node
    }

    maxChild(node) {
        while (node.right) node = node.right
       // Return a node of the maximum key
        return node
    }

    _removeNode(node) {
        // If the current node has no right child
        // (and might not have a left child)
        if (!node.right) {
            // If the current node is not a root node
            if (node.parent) {
                if (node === node.parent.right) node.parent.right = node.left
                else node.parent.left = node.left
                if (node.left) node.left.parent = node.parent
            }
                // If the current node is a root node
            else {
                this.root = node.left
                if (this.root) this.root.parent = null
            }
        }
                
        // If the current node has no left child
        // (and might not have a right child)
        else if (!node.left) {
            // If the current node is not a root node
            if (node.parent) {
                if (node === node.parent.right) node.parent.right = node.right
                else node.parent.left = node.right
                if (node.right) node.right.parent = node.parent
            }
            // If the current node is a root node
            else {
                this.root = node.right
                if (this.root) this.root.parent = null
            }   
        }
        // If the current node has both children
        else {
            const newNode = this.successor(node)
            this._removeNode(newNode)
            
            if (node === this.root) this.root = newNode
            else if (node.parent.right === node) node.parent.right = newNode
            else node.parent.left = newNode
                
            newNode.left = node.left
            newNode.right = node.right
            newNode.parent = node.parent
            if (node.right) node.right.parent = newNode
            if (node.left) node.left.parent = newNode    
        
            node.parent = node.left = node.right = null
        }
    }
}

/* 
 * Functions for creating DOM elements
 */
const createMenuEl = (categoryID, data) => {
    const menuEl = document.createElement('li')
    menuEl.classList.add(menuItemClassName)
    menuEl.setAttribute('data-category', categoryID)
    menuEl.setAttribute('data-category-name', data.name)
    menuEl.innerHTML = menuItemTemplate
        .replace(/{{CAT-ID}}/g, categoryID)
        .replace(/{{CATEGORY}}/g, data.name)
        .replace(/{{MAX-COUNT}}/g, data.products.length)
    return menuEl
}

const createSubmenuEl = (productID, categoryID, data) => {
    const submenuEl = document.createElement('li')
    submenuEl.classList.add(submenuItemClassName)
    submenuEl.setAttribute('data-product', productID)
    submenuEl.setAttribute('data-product-name', data.name)
    submenuEl.innerHTML = submenuItemTemplate
        .replace(/{{CAT-ID}}/g, categoryID)
        .replace(/{{PROD-ID}}/g, productID)
        .replace(/{{ICON}}/g, data.icon)
        .replace(/{{NAME}}/g, data.name)
        .replace(/{{PRICE}}/g, data.price)
        .replace(/{{CURRENCY}}/g, data.currency)
        .replace(/{{UNITS}}/g, data.units)
    return submenuEl
}

const crateCategorySectionEl = (categoryID, data) => {
    const categorySectionEl = document.createElement('li')
    categorySectionEl.classList.add(categorySectionClassName)
    categorySectionEl.setAttribute('data-category', categoryID)
    categorySectionEl.innerHTML = categorySectionTemplate
        .replace(/{{NAME}}/g, data.name)
    return categorySectionEl
}

const crateProductItemEl = (productID, categoryID, data) => {
    const productItemEl = document.createElement('li')
    productItemEl.classList.add(productItemClassName)
    productItemEl.setAttribute('data-product', productID)
    productItemEl.innerHTML = productItemTemplate
        .replace(/{{ICON}}/g, data.icon)
        .replace(/{{NAME}}/g, data.name)
        .replace(/{{DESCRIPTION}}/g, data.description)
        .replace(/{{PRICE}}/g, data.price)
        .replace(/{{CURRENCY}}/g, data.currency)
        .replace(/{{UNITS}}/g, data.units)
        .replace(/{{CAT-ID}}/g, categoryID)
        .replace(/{{PROD-ID}}/g, productID)
    return productItemEl
}

const insertDOMElSorted = (tree, key, insertedEl, parentEl) => {
    const insertedElNode = tree.insert(key, insertedEl)
    // In an element has a successor element, we will insert this
    // element before its successor
    const successorElNode = tree.successor(insertedElNode)
    if (!successorElNode) parentEl.appendChild(insertedEl)
    else parentEl.insertBefore(insertedEl, successorElNode.value)
}

const displayData = data => {
    const menuBST = new BST()
    const categorySectionsBST = new BST()

    data.forEach((categoryData, categoryID) => {
        const menuEl = createMenuEl(categoryID, categoryData)
        insertDOMElSorted(menuBST, categoryData.name, menuEl, menuSectionEl)

        const categorySectionEl = crateCategorySectionEl(categoryID, categoryData)
        insertDOMElSorted(categorySectionsBST, categoryData.name, categorySectionEl, mainContentEl)
        
        const submenuBST = new BST()
        const submenuSectionEl = menuEl.querySelector(submenuClass)

        categoryData.products.forEach((productData, productID) => {
            const submenuEl = createSubmenuEl(productID, categoryID, productData)
            insertDOMElSorted(submenuBST, productData.name, submenuEl, submenuSectionEl)
        })
    })
}

/* 
 * Functions handling events and functions which help to handle events
 */
const setSubmenuCheckboxes = (menuEl, isChecked) => {
    menuEl.querySelectorAll(submenuItemClass).forEach(submenuEl => {
        submenuEl.querySelector(checkboxClass).checked = isChecked
        const categoryID = parseInt(menuEl.getAttribute('data-category'))
        const productID = parseInt(submenuEl.getAttribute('data-product'))
        updateCategorySection(isChecked, categoryID, productID, false)
    })
}

const handleMenuCheckboxChange = e => {
    const menuEl = e.target.closest(menuItemClass)
    const categoryID = parseInt(menuEl.getAttribute('data-category'))
    const sectionSelector = `.${categorySectionClassName}[data-category="${categoryID}"]`
    const sectionEl = mainContentEl.querySelector(sectionSelector)
    const currCounterEl = menuEl.querySelector(counterCurrClass)
    const maxCounterEl = menuEl.querySelector(counterMaxClass)
    const currCount = parseInt(currCounterEl.innerText)
    const maxCount = parseInt(maxCounterEl.innerText)
    menuEl.querySelector(checkboxDesignedClass).classList.remove(partialCheckClassName)

    if (e.target.checked) {
        setSubmenuCheckboxes(menuEl, true)
        updateCounter(menuEl, maxCount - currCount)
        scrollTo(sectionEl, mainContentEl)
    }
    // Uncheck all checkboxes only if all of them are checked
    else {
        if (currCount === maxCount) {
            scrollTo(sectionEl, mainContentEl)
            setSubmenuCheckboxes(menuEl, false)
            updateCounter(menuEl, -maxCount)

            // Display popup if there are no more items selected
            if (!checkedCount) popupEl.classList.add(visibleClassName)
        }
    }
}

const updateCounter = (menuEl, delta) => {
    const currCounterEl = menuEl.querySelector(counterCurrClass)
    const newCount = parseInt(currCounterEl.innerText) + delta
    currCounterEl.innerText = newCount
    const maxCounterEl = menuEl.querySelector(counterMaxClass)
    const maxCount = parseInt(maxCounterEl.innerText)

    checkedCount += delta
    
    if (newCount === 0) return -1       // -1 if counter dropped to 0
    if (newCount === maxCount) return 1 //  1 if counter reached the maximum value
    return 0                            //  0 in other cases
}

const updateSubmenuCheckboxes = (isChecked, menuEl) => {
    const res = updateCounter(menuEl, isChecked ? 1 : -1)
    
    switch (res) {
        // Add partial check to the checkbox and remove full check if is checked
        case 0: 
            menuEl.querySelector(checkboxDesignedClass).classList.add(partialCheckClassName)
            menuEl.querySelector(checkboxClass).checked = false
            break
        // Add full check (partial check will be removed by handleMenuCheckboxChange function)
        // after 'change' event is fired on the menu item checkbox
        case 1:
            menuEl.querySelector(checkboxClass).checked = true
            break
        // Remove check from the checkbox if reached the minimum value
        case -1:
        default:
            menuEl.querySelector(checkboxDesignedClass).classList.remove(partialCheckClassName)
    }
}

const handleSubmenuCheckboxChange = e => {
    const menuEl = e.target.closest(menuItemClass)
    updateSubmenuCheckboxes(e.target.checked, menuEl)
    updateCategorySection(e.target.checked, ...getCheckboxCorrespondingIDs(e))
}

const getCheckboxCorrespondingIDs = e => {
    const menuEl = e.target.closest(menuItemClass)
    const submenuEl = e.target.closest(submenuItemClass)
    const categoryID = parseInt(menuEl.getAttribute('data-category'))
    const productID = parseInt(submenuEl.getAttribute('data-product'))
    return [categoryID, productID]
}

const scrollTopPercentFn = percent => {
    return (domEl, parentEl) => {
        const domElH = domEl.getBoundingClientRect().height
        const parentElH = parentEl.getBoundingClientRect().height
        return (domElH - parentElH) * percent
    }
}

const scrollTo = (domEl, parentEl, top = (domEl, parentEl) => 0) => {
    parentEl.scrollTo({
        top: domEl.offsetTop + top(domEl, parentEl),
        behavior: 'smooth'
    })
}

const updateCategorySectionInit = () => {
    const sectionsBSTs = []

    return (isChecked, categoryID, productID, scroll=true) => {
        // Update array with binary search trees
        for (let i = sectionsBSTs.length - 1; i <= categoryID; i++) sectionsBSTs.push(new BST())
        
        const sectionSelector = `.${categorySectionClassName}[data-category="${categoryID}"]`
        const sectionEl = mainContentEl.querySelector(sectionSelector)
        const sectionProductsEl = sectionEl.querySelector(sectionProductsClass)
        const productSelector = `.${productItemClassName}[data-product="${productID}"]`
        const productEl = sectionEl.querySelector(productSelector)
        const productData = data[categoryID].products[productID]

        // Add the product element to the main section (only if is not added)
        if (isChecked && !productEl) {
            const productEl = crateProductItemEl(productID, categoryID, productData)
            insertDOMElSorted(sectionsBSTs[categoryID], productData.name, productEl, sectionProductsEl)
            updateSummary(parseFloat(productData.price))
            addProductEventListeners(productEl)
            sectionEl.classList.add(visibleClassName)
            if (scroll) scrollTo(productEl, mainContentEl, scrollTopPercentFn(.5))
        // Remove the product element from the main section
        } else if (!isChecked) {
            sectionsBSTs[categoryID].remove(productData.name)
            if (scroll) scrollTo(productEl, mainContentEl, scrollTopPercentFn(.5))
            removeProductEventListeners(productEl)
            productEl.remove()
            const quantity = parseInt(productEl.querySelector(quantityInputClass).getAttribute('data-value'))
            updateSummary(-parseFloat(productData.price) * quantity)
            // Hide section if removed hte last item
            if (!sectionProductsEl.querySelectorAll(productItemClass).length) {
                sectionEl.classList.remove(visibleClassName)
            }
            if (!checkedCount) {
                popupEl.classList.add(visibleClassName)
                return
            }
        }
        popupEl.classList.remove(visibleClassName)
    }
}
const updateCategorySection = updateCategorySectionInit()

const chooseDelivery = initialAmount => {
    if (parseInt(initialAmount) === 0) return 0
    if (initialAmount < 100) return 9.99
    else return 0.00
}

const chooseDiscount = initialAmount => {
    if (initialAmount > 200)  return .05 * initialAmount // 5% discount
    if (initialAmount > 1000) return .1  * initialAmount // 10% discount
    if (initialAmount > 3000) return .15 * initialAmount // 15% discount
    return 0 // 0% discount
}

const splitAmount = amount => {
    return amount.toFixed(2).replace('-', '').split(/[.]0*/g).map(p => parseInt(p) || 0)
}

const updateSummary = amountDelta => {
    let initialAmount = parseFloat(summaryAmountInitialEl.innerText)
    const amountParts = splitAmount(initialAmount)
    const deltaParts = splitAmount(amountDelta)

    // Make calculations on integers for higher precision
    if (amountDelta >= 0) {
        amountParts[0] += deltaParts[0]
        amountParts[1] += deltaParts[1]
        amountParts[0] += parseInt(amountParts[1] / 100)
        amountParts[1] %= 100
    } else {
        if (deltaParts[1] > amountParts[1]) {
            amountParts[0] -= 1
            amountParts[1] += 100 
        }
        amountParts[0] -= deltaParts[0]
        amountParts[1] -= deltaParts[1]
    }

    initialAmount = amountParts.map(p => p.toString().padStart(2, '0')).join('.')

    const deliveryAmount = chooseDelivery(initialAmount).toFixed(2)
    const discountAmount = chooseDiscount(initialAmount).toFixed(2)
    const totalAmount = (
        parseFloat(initialAmount) - parseFloat(discountAmount) + parseFloat(deliveryAmount)
    ).toFixed(2)

    // Update displayed amounts
    summaryAmountInitialEl.innerText   = initialAmount
    summaryAmountDeliveryEl.innerText  = deliveryAmount
    summaryAmountDiscountsEl.innerText = discountAmount
    summaryAmountTotalEl.innerText     = totalAmount
}

const updateProductTotalPrice = (productEl, amount) => {
    productEl.querySelector(productTotalPriceClass).innerText = (amount || 0).toFixed(2)
}

const addProductEventListeners = productEl => {
    productEl.querySelector(quantityBtnMinusClass).addEventListener('click', decrementQuantity)
    productEl.querySelector(quantityBtnPlusClass).addEventListener('click', incrementQuantity)
    productEl.querySelector(quantityInputClass).addEventListener('input', handleQuantityInput)
}

const removeProductEventListeners = productEl => {
    productEl.querySelector(quantityBtnMinusClass).removeEventListener('click', decrementQuantity)
    productEl.querySelector(quantityBtnPlusClass).removeEventListener('click', incrementQuantity)
    productEl.querySelector(quantityInputClass).removeEventListener('input', handleQuantityInput)
}

const getProductIDs = e => {
    const productEl = e.target.closest(productItemClass)
    const sectionEl = productEl.closest(categorySectionClass)
    const productID = parseInt(productEl.getAttribute('data-product'))
    const categoryID = parseInt(sectionEl.getAttribute('data-category'))
    return [productID, categoryID]
}

const modifyQuantity = (e, delta) => {
    const quantityInputEl = e.target.parentElement.querySelector(quantityInputClass)
    let quantity = 0

    if (delta < 0) {
        const minQuantity = Math.max(parseInt(quantityInputEl.getAttribute('min')), 0)
        quantity = Math.max(parseInt(quantityInputEl.value) + delta, minQuantity)
    } else if (delta > 0) {
        const maxQuantity = Math.min(parseInt(quantityInputEl.getAttribute('max')), 999)
        quantity = Math.min(parseInt(quantityInputEl.value) + delta, maxQuantity)
    }
    e.target.value = quantity
    applyQuantityChange(e, quantity, delta)
}

const applyQuantityChange = (e, quantity, delta) => {
    const quantityInputEl = e.target.parentElement.querySelector(quantityInputClass)
    const [productID, categoryID] = getProductIDs(e)
    const unitPrice = data[categoryID].products[productID].price

    if (quantity === 0) {
        removeProduct(productID, categoryID)
    } else {
        quantityInputEl.value = quantity
        quantityInputEl.setAttribute('data-value', quantity)
        updateProductTotalPrice(quantityInputEl.closest(productItemClass), quantity * unitPrice)
        updateSummary(delta * unitPrice)
    }
}

const incrementQuantity = e => { e.preventDefault(); modifyQuantity(e, +1) }
const decrementQuantity = e => { e.preventDefault(); modifyQuantity(e, -1) }

const removeProduct = (productID, categoryID) => {
    const menuEl = menuSectionEl.querySelector(`${menuItemClass}[data-category="${categoryID}"]`)
    const submenuEl = menuEl.querySelector(`${submenuItemClass}[data-product="${productID}"]`)
    const submenuCheckboxEl = submenuEl.querySelector(checkboxClass)
    submenuCheckboxEl.checked = false
    updateSubmenuCheckboxes(false, menuEl)
    updateCategorySection(false, categoryID, productID)
}

const handleQuantityInput = e => {
    e.preventDefault()
    const prevQuantity = parseInt(e.target.getAttribute('data-value'))
    const currQuantity = parseInt(e.target.value)
    const minQuantity = Math.max(parseInt(e.target.getAttribute('min')), 0)
    const maxQuantity = Math.min(parseInt(e.target.getAttribute('max')), 999)

    // If is not a number
    if (currQuantity === NaN) return

    if (minQuantity <= currQuantity && currQuantity <= maxQuantity) {
        const deltaQuantity = currQuantity - prevQuantity
        applyQuantityChange(e, currQuantity, deltaQuantity)
    // If inputted quantity is too large or too small, restore the previous one
    } else e.target.value = prevQuantity
}

const setupMenuItems = () => {
    $a(menuItemClass).forEach(menuEl => {
        const menuCheckBoxEl = menuEl.querySelector(checkboxClass)
        menuCheckBoxEl.addEventListener('change', handleMenuCheckboxChange)
    })
    $a(submenuItemClass).forEach(menuEl => {
        const submenuCheckBoxEl = menuEl.querySelector(checkboxClass)
        submenuCheckBoxEl.addEventListener('change', handleSubmenuCheckboxChange)
    })
}

// Initialization
loadJsonFiles(jsonObjs => {
    data = mergeJSONObjects(jsonObjs)
    displayData(data)
    setupMenuItems()
})
})()
