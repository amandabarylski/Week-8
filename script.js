/*Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:

    Use at least one array.
    Use at least two classes.
    Your menu should have the options to create, view, and delete elements.
*/

//I decided I wanted to create a menu that allowed users to create characters as well as equipment to add to them.
//To begin with, I defined the character class with a name and role in the constructor, adding an empty array to place items.
class Character {
    constructor(name, role) {
        this.name = name
        this.role = role
        this.inventory = []
    }

    addItem(item) {
        if (item instanceof Item) {
            this.inventory.push(item)
        } else {
            throw new Error(`${item} cannot be added. Please add an Item.`)
        }
    }
//I included a basic describe function in case I needed to refer back to it as well as a more complex function to show the inventory.
/*As most important functionality in the example was in the menu with the functions in the other classes left untouched,
I was unsure about whether I would need these but decided to create them just in case.*/
//Upon altering my code, I needed the describe() function for the characters, and moved the showInventory for loop into it as well.
    describe() {
        let allItems = `Current Inventory:\n`
        for (let i = 0; i < this.inventory.length; i++) {
            allItems += `${this.inventory[i].name} - ${this.inventory[i].type}\n`
        }
        return `${this.name} is a ${this.role} character.\n${allItems}}`
    }
/*After getting frustrated over being required to use a for loop to concatenate a simple array (and for those I still think
join is much better and more efficient), I decided to use a for loop to arrange the objects in this array more neatly.*/
//I commented it out when I edited the describe() function above, but left it in to show what it originally looked like.
    // showInventory() {
    //     let allItems = `Current Inventory:\n`
    //     for (let i = 0; i < this.inventory.length; i++) {
    //         allItems += `${this.inventory[i].name} - ${this.inventory[i].type}\n`
    //     }
    //     return allItems
    // }
}
//The Item class is much more basic, with simply a name and type and basic describe function.
class Item {
    constructor(name, type) {
        this.name = name
        this.type = type
    }

    describe() {
        return `${this.name} is a ${this.type} type item.`
    }
}
//I called the class Menu as in the example video, adjusting the names of the elements in the constructor to fit my own ideas.
class Menu {
    constructor() {
        this.characters = []
        this.selectedCharacter = null
    }
//Instead of retyping everything, I copied and pasted the start() and showMainMenuOptions() sections from my notes and altered them.
    start() {
        let selection = this.showMainMenuOptions()
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCharacter()
                    break;
                case '2':
                    this.viewCharacter()
                    break;
                case '3':
                    this.deleteCharacter()
                    break;
                case '4':
                    this.displayAllCharacters()
                    break;
                default:
                    selection = 0
            }
            selection = this.showMainMenuOptions()
        }

        alert('Goodbye!')
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new character
            2) view character
            3) delete character
            4) display all characters
            `)
    }
//The create, delete, and display functions are basically the same as the ones from the tutorial as well.
//This time, though, I typed them out manually to get used to the syntax.
    createCharacter() {
        let name = prompt('Enter a name for this character.')
        let role = prompt('Is this character melee, ranged, or magic?')
        this.characters.push(new Character(name, role))
    }

    deleteCharacter() {
        let index = prompt('Enter the index number of the character you wish to delete.')
        if (index > -1 && index < this.characters.length) {
            this.characters.splice(index, 1)
        }
    }

    displayAllCharacters() {
        let allCharacters = ``
        for (let i = 0; i < this.characters.length; i++) {
            allCharacters += `${this.characters[i].name} - ${this.characters[i].role}\n`
        }
        alert(allCharacters)
    }
//I also copied and pasted viewTeam from my notes and changed it to fit my Character class instead.
    viewCharacter() {
        let index = prompt('Enter the index of the character you wish to view:')
        if (index > -1 && index < this.characters.length) {
            this.selectedCharacter = this.characters[index]
            let description = this.selectedCharacter.describe()

            let selection = this.showCharacterMenuOptions(description)
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem()
                case '3':
                    this.showInventory()
            }
        }
    }

    showCharacterMenuOptions(characterInfo) {
        return prompt(`
            0) back
            1) create item
            2) delete item
            ---------
            ${characterInfo}`)
    }

    createItem() {
        let name = prompt('What is the name of this item?')
        let type = prompt('Is this a weapon, trinket, or gear type item?')
        this.selectedCharacter.inventory.push(new Item(name, type))
    }

    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete:')
        if (index > -1 && index < this.selectedCharacter.inventory.length) {
            this.selectedCharacter.inventory.splice(index, 1)
        }
    }
//I originally tried to have Show Inventory as a menu option using this function, but it didn't work.
//When I tested including inventory in the description of the character, it looked cleaner anyway.
    // showInventory() {
    //     alert(this.selectedCharacter.showInventory())
    //}
}

let menu = new Menu()
menu.start()