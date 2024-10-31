const usermsg=document.getElementById('user-id')
const passmsg=document.getElementById('pass-id')
const btn=document.getElementById('btn')
const form=document.getElementById('form')


btn.addEventListener('click',(e)=>{
    const user=document.getElementById('username')
    const pass=document.getElementById('password')
    const value=verify(user,pass)
    if(!value){
        e.preventDefault();
    }
})



function verify(user,pass){
    if(user.value===''){
        usermsg.innerHTML="! user name is not valid";
        return false
    }else if( pass.value===''){
        passmsg.innerHTML="! password is incorret"
        return false;
    }else{
        passmsg.innerHTML=""
        return true;
    }
}
