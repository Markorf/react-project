const obj = {
    name: "Max",
    inner: {
        age: 20,
        inner2: {
            street: "NSRS"
        }
    }
};

const copyObj = {...obj};
copyObj.name="Fix";
const innerCopy = {...copyObj.inner};
innerCopy.age = 50;
innerCopy.inner2.street="TFZR";

console.log(obj);
console.log(copyObj);
console.log(innerCopy);
