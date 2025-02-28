let idxFrom;
let idxTo ;

 function shortestpath () {
    console.log('jbxjscjd');
    let curr_data,V,src,dst;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    // const genNew = document.getElementsByClassName('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    const temptext2 = document.getElementById('temptext2');
    const lineexp=document.getElementById('lineexp');
    const cities = ['Subhash Nagar', 'Tagore Garden', 'Kirti Nagar', 'Rajouri', 'punjabi bagh', 'shakurpur', 'Azadpur', 'Majlis Park', 'JahangirPuri', 'Samaypur','Ashok Park','Shivaji park','Paschim vihar'];

    //1 -> blue
    //2 -> pink
    //3 -> yellow
    //4 -> green
    const metroline = {
        'Subhash Nagar' : [1],
        'Tagore Garden' : [1],
        'Kirti Nagar' : [1, 4],
        'Rajouri' : [1,2],
        'punjabi bagh' : [2,4],
        'shakurpur' : [2],
        'Azadpur' : [2,3],
        'Majlis Park' : [2],
        'JahangirPuri' : [3],
        'Samaypur' : [3],
        'Ashok Park' : [4],
        'Shivaji park' : [4],
        'Paschim vihar' : [4]
    };

    const lines = {
        1 : ['Subhash Nagar', 'Tagore Garden', 'Kirti Nagar', 'Rajouri'],
        2 : ['Rajouri', 'punjabi bagh', 'shakurpur', 'Azadpur', 'Majlis Park'],
        3 : ['Azadpur', 'JahangirPuri', 'Samaypur'],
        4 : ['Kirti Nagar','Ashok Park','Shivaji park','Paschim vihar']
    }

    // initialise graph options
    const options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '18px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf238',
                size: 40,
                color: '#991133',
            }       // \uf015
        }
    };

    // Initialize your network!
    // Network for question graph
    const network = new vis.Network(container);
    network.setOptions(options);
    // Network for result graph
    const network2 = new vis.Network(container2);
    network2.setOptions(options);

// program to implement queue data structure
class Queue {
    constructor() {
        this.items = [];
    }

    // add element to the queue
    enqueue(element) {
        return this.items.push(element);
    }

    // remove element from the queue
    dequeue() {
        if(this.items.length > 0) {
            return this.items.shift();
        }
    }

    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }

    // check if the queue is empty
    isEmpty(){
       return this.items.length == 0;
    }

    // the size of the queue
    size(){
        return this.items.length;
    }

    // empty the queue
    clear(){
        this.items = [];
    }
}
    
    function createData(){
        V =cities.length; //Math.floor(Math.random() * 8) + 3;  Ensures V is between 3 and 10
        let nodes = [];
        for(let i=1;i<=V;i++){
            nodes.push({id:i, label: cities[i-1]})
        }
        // Prepares vis.js style nodes for our data
        nodes = new vis.DataSet(nodes);

        // Creating a tree like underlying graph structure
        let edges = [];

        // blue line
        for(let i=1;i<=3;i++){
            edges.push({type: 0, from: i, to: (i+1), color: 'blue',label: String(Math.floor(Math.random()*70)+31)});
        }

        // pink line
        for(let i=4;i<=7;i++){

            edges.push({type: 1, from: i, to: (i+1), color: 'pink',label: String(Math.floor(Math.random()*70)+31)});
        }

        // yellow line
        edges.push({type: 2, from: 7, to: 9, color: 'yellow',label: String(Math.floor(Math.random()*70)+31)});
        edges.push({type: 2, from: 9, to: 10, color: 'yellow',label: String(Math.floor(Math.random()*70)+31)});

        // green line
        edges.push({type: 3, from: 3, to: 11, color: 'green',label: String(Math.floor(Math.random()*70)+31)});
        edges.push({type: 3, from: 11, to: 5, color: 'green',label: String(Math.floor(Math.random()*70)+31)});
        edges.push({type: 3, from: 5, to: 12, color: 'green',label: String(Math.floor(Math.random()*70)+31)});
        edges.push({type: 3, from: 12, to: 13, color: 'green',label: String(Math.floor(Math.random()*70)+31)});

        src = idxFrom;
        dst = idxTo;
        curr_data = {
            nodes: nodes,
            edges: edges
        };
    }

    function minLines(src, dest){
        let graph = [];
        for(let i=0;i<=4;i++){
            graph.push([]);
        }

        for(let i = 1 ; i <= 4 ; i++){
            for(let j = 1 ; j <= 4 ; j++){
                if(i == j){
                    continue;
                }
                if(hasCommonStation(i,j)){
                    graph[i].push(j);
                    graph[j].push[i];
                }
            }
        }

        var queue = new Queue();
        let vis = Array(4).fill(0);
        for(let i = 0 ;i<(metroline[cities[src]]).length;i++){
            queue.enqueue([metroline[cities[src]][i],1,""+(metroline[cities[src]][i])]);
            vis[metroline[cities[src]][i]]=1;
        }
        while (!queue.isEmpty()) {
            let t = queue.dequeue();

            // Log every element that comes out of the Queue
            console.log(t);

            // 1. In the edges object, we search for nodes this node is directly connected to.
            // 2. We filter out the nodes that have already been explored.
            // 3. Then we mark each unexplored node as explored and add it to the queue.
            for(let nbr in graph[t[0]]){
                let stnont=lines[t[0]];
                for(let i=0;i<stnont.length;i++){
                    if(stnont[i]==cities[dest]){
                        return t;
                    }
                }
                if(vis[graph[t[0]][nbr]]==0){

                    queue.enqueue([graph[t[0]][nbr],t[1]+1,t[2]+graph[t[0]][nbr]]);
                }
            }
         }


    }
    function hasCommonStation(i,j){
        for (const item in lines) {
            console.log(item)
          }
          console.log(lines[1]);
        for(let x = 0 ; x < (lines[i]).length ;x++){
            for(let y= 0 ; y< (lines[j]).length;y++){
                if((lines[i])[x] == (lines[j])[y]){
                    return true;
                }
            }
        }
        return false;
    }

     function genNew () {
        // Create new data and display the data
        createData();
        network.setData(curr_data);
        temptext2.innerText = 'Find least time path from '+cities[idxFrom]+' to '+cities[idxTo];
        temptext.style.display = "inline";
        temptext2.style.display = "inline";
        container2.style.display = "none";
        lineexp.innerText="";

    };

    
    solve.onclick = function () {
        // Create graph from data and set to display
        temptext.style.display  = "none";
        temptext2.style.display  = "none";
        container2.style.display = "inline";
        network2.setData(solveData());
        let a =  minLines(idxFrom,idxTo+1);
        lineexp.style.display="flex";
        lineexp.style.flexDirection="column";
        const div1=document.createElement("div");
        const div2=document.createElement("div");
        div2.style.display="flex";
        div1.style.display="flex";
        div1.style.marginLeft="1rem";
        div2.style.marginLeft="1rem";
        const para = document.createElement("p");
        const textNode = document.createTextNode(`Minimum metro lines path : ${a[1]}`);
        para.appendChild(textNode);
        div1.appendChild(para);
        const para1 = document.createElement("p");
        const textNode1 = document.createTextNode(`${cities[src]}`);
        para1.appendChild(textNode1);
        div2.appendChild(para1);
        var colorString=a[2];
        var len=a[1];
        for(var i=0;i<len;i++){
            var elem = document.createElement("hr");
            elem.setAttribute("width", "30px");
            // elem.setAttribute("height", "20px");
            // elem.setAttribute("margin", "1rem");
            elem.setAttribute("border", "0");
            // elem.style.margin="0rem";
            elem.style.height="5px";
            elem.style.marginTop="1rem";
            elem.style.marginBottom="1rem";
            // elem.style.border="0";
            elem.style.marginLeft="5px";
            elem.style.marginRight="5px";
            // elem.style.display="flex";
            if(colorString[i]=='1'){
                elem.setAttribute("color", "blue");
                // elem.color="blue";
            }else if(colorString[i]=='2'){
                elem.setAttribute("color", "pink");
                // elem.color="pink";
            }else if(colorString[i]=='3'){
                elem.setAttribute("color", "yellow");
                // elem.color="yellow";
            }else{
                elem.setAttribute("color", "green");
                // elem.color="green";
            }
            div2.appendChild(elem);
        }
        const para2 = document.createElement("p");
        const textNode2 = document.createTextNode(`${cities[dst]}`);
        para2.appendChild(textNode2);
        div2.appendChild(para2);
        lineexp.appendChild(div1);
        lineexp.appendChild(div2);
        
// element.style {
// }
// hr {
//     margin-top: 1rem;
//     margin-bottom: 1rem;
//     border: 0;
//     margin-left: 1rem;
//     border-top: 1px solid #007bff;
        // lineexp.appendChild(para);
        // var elem = document.createElement("hr");
        // elem.setAttribute("width", "100px");
        // lineexp.appendChild(elem);
        // lineexp.innerText = "Minimum metro lines path :"+a[1] +"\n" + cities[src-1] +  " "+a[2] +" "+ cities[dst-1];
    };


    
    function djikstra(graph, sz, src) {
        let vis = Array(sz).fill(0);
        let dist = [];
        for(let i=1;i<=sz;i++)
            dist.push([10000,-1]);
        dist[src][0] = 0;

        for(let i=0;i<sz-1;i++){
            let mn = -1;
            for(let j=0;j<sz;j++){
                if(vis[j]===0){
                    if(mn===-1 || dist[j][0]<dist[mn][0])
                        mn = j;
                }
            }

            vis[mn] = 1;
            for(let j in graph[mn]){
                let edge = graph[mn][j];
                if(vis[edge[0]]===0 && dist[edge[0]][0]>dist[mn][0]+edge[1]){
                    dist[edge[0]][0] = dist[mn][0]+edge[1];
                    dist[edge[0]][1] = mn;
                }
            }
        }

        return dist;
    }

    function createGraph(data){
        let graph = [];
        for(let i=1;i<=V;i++){
            graph.push([]);
        }

        for(let i=0;i<data['edges'].length;i++) {
            let edge = data['edges'][i];
            // if(edge['type']===1)
            //     continue;
            graph[edge['to']-1].push([edge['from']-1,parseInt(edge['label'])]);
            graph[edge['from']-1].push([edge['to']-1,parseInt(edge['label'])]);
        }
        return graph;
    }
   
    function solveData() {

        const data = curr_data;

        // Creating adjacency list matrix graph from question data
        const graph = createGraph(data);
        console.log(minLines(src,dst));
        // Applying djikstra from src and dst
        let dist1 = djikstra(graph,V,src);
        let dist2 = djikstra(graph,V,dst);

        // Initialise min_dist to min distance via bus from src to dst
        let mn_dist = dist1[dst][0];

        // See if plane should be used
        // let {plane, p1, p2} = shouldTakePlane(data['edges'], dist1, dist2, mn_dist);

        let new_edges = [];

        new_edges.push(...pushEdges(dist1, dst, false));
        const ans_data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return ans_data;
    }

    function pushEdges(dist, curr, reverse) {
        let tmp_edges = [];
        while(dist[curr][0]!==0){
            let fm = dist[curr][1];
            if(reverse)
                tmp_edges.push({arrows: { to: { enabled: true}},from: curr+1, to: fm+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
            else
                tmp_edges.push({arrows: { to: { enabled: true}},from: fm+1, to: curr+1, color: 'orange', label: String(dist[curr][0] - dist[fm][0])});
            curr = fm;
        }
        return tmp_edges;
    }

    genNew();
};
// const source = document.getElementById('source');
// source.onchange=function(){
//     console.log('hiii');
//    }



const cities = ['Subhash Nagar', 'Tagore Garden', 'Kirti Nagar', 'Rajouri', 'punjabi bagh', 'shakurpur', 'Azadpur', 'Majlis Park', 'JahangirPuri', 'Samaypur', 'Ashok Park', 'Shivaji park', 'Paschim vihar'];
let from = '';

document.addEventListener('DOMContentLoaded', function() {
    const source = document.getElementById('source');

    source.onchange = function(e) {
        from = e.target.value;
        console.log(from);
      //  console.log(from.length);

        if (from.length > 0) {
            findIdxSrc(from);
        }
    };
});

let to = '';
document.addEventListener('DOMContentLoaded', function() {
    const dest = document.getElementById('dest');
    dest.onchange = function(e) {
        to = e.target.value;
        console.log(to);
       // console.log(to.length);

        if (to.length > 0) {
            findIdxDst(to);
        }
    };
});

function findIdxSrc(from) {
    console.log("called");
     idxFrom = cities.indexOf(from);
   // idxFrom = index;
    
    if (idxFrom !== -1) {
        console.log(`Index of ${from}: ${idxFrom}`);
    } else {
        console.log(`${from} not found in the array.`);
    }
}

function findIdxDst(to) {
    console.log("called");
     idxTo = cities.indexOf(to);
    
    if (idxTo !== -1) {
        console.log(`Index of ${to}: ${idxTo}`);
    } else {
        console.log(`${to} not found in the array.`);
    }

    if(idxTo >=0 && idxFrom>=0){
        shortestpath();
    }
}

