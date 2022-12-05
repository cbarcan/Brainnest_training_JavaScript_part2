# JavaScript part 2

### 1. Why is it important to write clean code?
    Writing clean code is important because it allows you to clearly communicate with the next person who works with what you've written.
### 2. What is the difference between good comments and bad comments?
    A good comment tells the reader why this particular code is doing whatever it is doing or explains what a section of code is about to do. A bad comment restates what a particular line of code is doing.
### 3. What is an array?
    An array is a collection of elements of the same type placed in contiguous memory locations that can be individually referenced by using an index to a unique identifier.
### 4. What are arrays useful for?
    Arrays help maintain large sets of data under a single variable name to avoid confusion that can occur when using several variables.
### 5. How do you access an array element?
    arrayName[index]
### 6. How do you change an array element?
    arrayName[index] = value
### 7. What are some useful array properties?
    length
### 8. What are some useful array methods?
    Important Array Methods 1. filter() · 2. forEach() · 3. some() · 4. every() · 5. includes() · 6. map() · 7. reduce()
### 9. What are loops useful for?
    Loops are a programming element that repeat a portion of code a set number of times until the desired process is complete.
### 10. What is the break statement?
    The break statement terminates the execution of the nearest loop.
### 11. What is the continue statement?
    A continue statement ends the current iteration of a loop.
### 12. What is the DOM?
    The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web.
### 13. How do you target the nodes you want to work with?
    document.getElementBy..() / document.querySelector()
### 14. How do you create an element in the DOM?
    const element = document.createElement()
### 15. How do you add an element to the DOM?
    appendChild()
### 16. How do you remove an element from the DOM?
    removeChild()
### 17. How can you alter an element in the DOM?
    setAttribute()
### 18. When adding text to a DOM element, should you use textContent or innerHTML?
    textContent
### 19. Where should you include your JavaScript tag in your HTML file when working with DOM nodes?
    The script tag should always be used before the body close or at the bottom in HTML file.
### 20. How do “events” and “listeners” work?
    An event listener is a function that initiates a predefined process if a specific event occurs. So, an event listener “listens” for an action, then calls a function that performs a related task.
### 21. What are three ways to use events in your code?
    There are three ways to assign events to elements: inline event handlers, event handler properties, and event listeners.
### 22. Why are event listeners the preferred way to handle events?
    Generally, it is advised to use event listeners over event handlers because you can add multiple event listeners for the same event.
### 23. What are the benefits of using named functions in your listeners?
    It has access to many useful properties and functions such as which mouse button or key was pressed, or information about the event’s target - the DOM node that was clicked.
### 24. How do you attach listeners to groups of nodes?
    document.querySelectorAll
    forEach
    addEventListener
### 25. What is the difference between the return values of querySelector and querySelectorAll?
    querySelector - return the first element
    querySelectorAll - return the all the elements
### 26. What does a “nodelist” contain?
    A NodeList is a collection of document nodes (element nodes, attribute nodes, and text nodes).
### 27. Explain the difference between “capture” and “bubbling”.
    Event Bubbling − Whenever an event happens on an element, the event handlers will first run on it and then on its parent and finally all the way up to its other ancestors.
    Event Capturing − It is the reverse of the event bubbling and here the event starts from the parent element and then to its child element.
### 28. What is the difference between objects and arrays?
    Both objects and arrays are considered “special” in JavaScript. Objects represent a special data type that is mutable and can be used to store a collection of data (rather than just a single value). Arrays are a special type of variable that is also mutable and can also be used to store a list of values.
### 29. How do you access object properties?
    object.property
    object['property']