const nodeSpaceHierarchy = new NodeSpaceHierarchy();
// const eventDelegator = new EventDelegator(nodeSpaceHierarchy);

const rootNodeSpaceData = {}; // Data for the root NodeSpace
const rootNodeSpace = new NodeSpace('root', rootNodeSpaceData);
const rootWorkSpace = new WorkSpace('root', rootNodeSpaceData);

// Create and set up SVG for the entire NodeSpace hierarchy
function init()
{

    ///Set up the root NodeSpace
    // ns_container = d3.select('#nodeSpace_container');
    rootNodeSpace.create(d3.select('#nodeSpace_container'));

    // Set the root NodeSpace as the active NodeSpace initially
    nodeSpaceHierarchy.setActiveNodeSpace(rootNodeSpace);


    rootWorkSpace.create(d3.select('#workSpace_container'));
    nodeSpaceHierarchy.setActiveWorkSpace(rootNodeSpace);




        ///Set up the root WorkSpace
        // const container = d3.select('#nodeSpace_container');
        // rootNodeSpace.create(container);
    
        // // Set the root NodeSpace as the active NodeSpace initially
        // nodeSpaceHierarchy.setActiveNodeSpace(rootNodeSpace);


// eventDelegator.setActiveNodeSpace(rootNodeSpace);

// Handle events
// document.addEventListener('click', event => {
//     eventDelegator.handleEvent(event);
// });
}