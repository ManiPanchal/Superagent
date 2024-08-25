async function get_todos()
{
    let res=await fetch("https://jsonplaceholder.typicode.com/todos/");
    res=await res.json();

    console.log(res.length);
    return res;
}
module.exports={get_todos};