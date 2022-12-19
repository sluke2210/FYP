server_name="http://localhost:5123/"

let target_residues_phi_stack =  [];
let target_residues_psi_stack = [];
let constr_residues_phi_stack = [];
let constr_residues_psi_stack = [];

function do_something(){
    console.log("click");
    jmolApplet(400,'load=1crn AS "myfile.pdb"', "1");
    document.getElementById("applet1").innerHTML = jmolApplet1._code; 

}
function load_pdb(){
    var pdb_id = document.getElementById("pdb_txt_input").value;
    if (pdb_id != null){
       // var pdbdata =load("="+pdb_id);
        jmolApplet1._loadFile("="+pdb_id);
        //document.getElementById("applet1").innerHTML =  jmolApplet(400,pdbdata, "1")._code;
        //jmolApplet1._code; 
    }
}

function add_target_phi(){
  console.log("call")
  let phi_idx = Number.parseInt( document.getElementById("target_residues_phi_idx").value);
  let phi_val = Number.parseFloat(  document.getElementById("target_residues_phi_value").value);
  let p_tag_text =document.getElementById("target_phi_string").innerHTML;
  phi_idx_is_num =  phi_idx.toString() != "NaN"//(typeof phi_idx === 'number' || phi_idx instanceof Number) && phi_idx != NaN
  phi_val_is_num  = phi_val.toString() != "NaN" //(typeof phi_val === 'number' || phi_val instanceof Number) && phi_val != NaN
  
  if(! phi_idx_is_num){
    showError("phi_idx not valid")
    if(!phi_val_is_num ){
      console.log(phi_idx_is_num + " " +phi_val_is_num )
      console.log(typeof(phi_val))
      showError("phi_val not valid")
    }
  }
  if(phi_idx_is_num && phi_val_is_num ){
 // p_tag_text = p_tag_text + " " + phi_idx + " " + phi_val + "\n"
  //document.getElementById("target_phi_string").innerHTML = p_tag_text;
  target_residues_phi_stack.push([phi_idx, phi_val]);
  printStacks();
  }
}
function remove_target_phi(){
  target_residues_phi_stack.pop();
  printStacks();
}
function add_target_psi(){
  let psi_idx = Number.parseInt(document.getElementById("target_residues_psi_idx").value);
  let psi_val = Number.parseFloat( document.getElementById("target_residues_psi_value").value);
  let p_tag_text =document.getElementById("target_psi_string").innerHTML;
  psi_idx_is_num = psi_idx.toString() != "NaN" // (typeof psi_idx === 'number' || psi_idx instanceof Number) && psi_idx != NaN
  psi_val_is_num  =psi_val.toString() != "NaN" // (typeof psi_val === 'number' || psi_val instanceof Number) && psi_val != NaN

  if(! psi_idx_is_num){
    showError("psi_idx not valid")
    if(! psi_val_is_num ){
      showError("psi_val not valid")
    }
  }
  if(psi_idx_is_num && psi_val_is_num ){
 // p_tag_text = p_tag_text + " " + psi_idx + " " + psi_val + "\n"
 // document.getElementById("target_psi_string").innerHTML = p_tag_text;
  target_residues_psi_stack.push([psi_idx,psi_val]);
  printStacks();
  }
}
function remove_target_psi(){
  target_residues_psi_stack.pop();
  printStacks();
}
function add_constr_phi(){
  let phi_idx = Number.parseInt(document.getElementById("constr_residues_phi").value);
  let p_tag_text =document.getElementById("constr_residues_phi_string").innerHTML;
  phi_idx_is_num = phi_idx.toString() != "NaN" //(typeof phi_idx === 'int' || phi_idx instanceof Number) && phi_idx != NaN
  if(! phi_idx_is_num){
    showError("phi_constr not valid")
  }
  if(phi_idx_is_num){
//  p_tag_text = p_tag_text + " " + phi_idx+ "\n"
//  document.getElementById("constr_residues_phi_string").innerHTML = p_tag_text;
  constr_residues_phi_stack.push(phi_idx);
  printStacks();
  }
}
function remove_constr_phi(){
  constr_residues_phi_stack.pop();
  printStacks();
}
function add_constr_psi(){
  let psi_idx =  Number.parseInt( document.getElementById("constr_residues_psi").value);
  let p_tag_text =document.getElementById("constr_residues_psi_string").innerHTML;
  psi_idx_is_num = psi_idx.toString() != "NaN" //(typeof psi_idx === 'int' || psi_idx instanceof Number) && psi_idx != NaN
  if(! psi_idx_is_num){
    showError("psi_constr not valid")
  }
  if(psi_idx_is_num){
 // p_tag_text = p_tag_text + " " + psi_idx+ "\n"
 // document.getElementById("constr_residues_psi_string").innerHTML = p_tag_text
   constr_residues_psi_stack.push(psi_idx);
   printStacks();
  }
}
function remove_constr_psi(){
  constr_residues_psi_stack.pop();
  printStacks();
}
//edited from https://stackoverflow.com/questions/29775797/fetch-post-json-data
async function send(){
  const rawResponse = await fetch(server_name, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
}
async function submit_to_server(){                     
    let pdb_id = document.getElementById("pdb_txt_input").value;
    let output_fname = document.getElementById("fname").value;
    let chain = document.getElementById("chain").value;
    let segbeg =Number.parseInt( document.getElementById("segbeg").value);
    let segend = Number.parseInt(document.getElementById("segend").value);
    let itterations = Number.parseInt( document.getElementById("itterations").value);
    let isValid = validateInput(pdb_id,output_fname,chain,segbeg,segend,itterations);
    if(isValid){
      console.log("send json");

    }
   /*
    var ajax_req = new XMLHttpRequest();

    ajax_req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //jmolApplet1._loadFile("=2arp")
            //console.log("ncwhjfkjnwefclkwxnnxnxnxnxnxnxnx")
            listen_for_file(output_fname);
        }
    }
    ajax_req.open('GET', 'index.php?pdb_id='+pdb_id+"&output_fname="+output_fname
    +"&chain="+chain+"&segbeg="+segbeg+"&segend="+segend+"&targ_phi="+target_residues_phi
    +"&targ_psi="+target_residues_psi+"&constr_phi="+constr_residues_phi+"&constr_psi="+constr_residues_psi+"&itterations="+itterations,true )
    ajax_req.send()
*/
}

const url = 'localhost:8000/index.php'; //A local page

function load(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    console.log("state change to " + xhr.readyState === 4)
    if (xhr.readyState === 4) {
        console.log(" hfbewkrnflweiknrflwekfrlkwehnfew ");
      callback(xhr.response);
    }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}

function callback(rs){
    console.log(rs);
    console.log(" nownownownownownownownownownownownownownownownownownownownownownownownownownownow ");
    alert("calledback");
}

async function listen_for_file(fname) {
    console.log('calling eith fname ' + fname);
    const result = await load_from_server(fname);
    while(result != 'resolved'){
        result = await load_from_server(fname);
    }
    console.log("Hello " + result);
    
    jmolApplet0._loadFile(server_name+fname)
    
    // expected output: "resolved"
  }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
 // delay(1000).then(() => console.log('ran after 1 second1 passed'));

  async function load_from_server(fname) {
    return new Promise(resolve => {
    console.log("fetching " + server_name+fname)
    fetch(server_name+fname)
    .then(function(){
      console.log('200 OK');
      resolve('resolved');
    }).catch(function(){
        console.log('400 not OK');
        resolve('error');
        });
    });
 
  }
//matlab -nodisplay -nojvm -r  "Loop_Modeller2_wrapper('1adg','LADH_loopmovement.pdb','A',290,301,[291 -90 ; 292 -110; 293 -64; 294 -90],[291 122; 292 -35; 293 147],[295 296],[294 295],10000);exit;"
  function validateInput(pdb_id, fname, chain, segbeg, segend, itterations ){
    // is pdb_id a 4 character string
    pdbid_is_4char = (typeof pdb_id === 'string' || pdb_id instanceof String) && pdb_id.length == 4
    if (! pdbid_is_4char){
      showError("pdb_id is invalid")
    }
    //is fname a string 
    fname_is_string=(typeof fname === 'string' || fname instanceof String)
    if (! fname_is_string){
      showError("fname invalid")
    }
    //is chain a string / character (length = 1)
    chain_is_1char =(typeof chain === 'string' || chain instanceof String) && chain.length == 1
    if (! chain_is_1char){
      showError("chain invalid")
    }
    //is segbeg a number
    segbeg_is_num =(typeof segbeg === 'number' || segbeg instanceof Number)
    if (! segbeg_is_num){
      showError("segbeg invalid")
    }
    //is seg end a number
    segend_is_num =(typeof segend === 'number' || segend instanceof Number)
    if (! segbeg_is_num){
      showError("segend invalid")
    }
    //is segend > segbeg
    if( segend < segbeg ){
      showError("segend is > than segbeg which is not allowd")
    }
    itterations_is_num =(typeof itterations === 'number' || itterations instanceof Number) && itterations<100000
    if (! segbeg_is_num){
      showError("segbeg invalid")
    }
    //is phi_targ_arr a list of number pairs 
    //is phi_targ_arr a list of number pairs 

    //is phi_targ_arr a list of numbers 
    //is phi_targ_arr a list of numbers

    //is number of pairs in phi tar and phi targ < segend - segbeg
    let lengths_fit = ((target_residues_phi_stack.length < (segend - segbeg))  ||
    (target_residues_psi_stack.length < (segend - segbeg))  ||
    (constr_residues_phi_stack.length < (segend - segbeg))  ||
    (constr_residues_psi_stack.length < (segend - segbeg)))

    if(!lengths_fit){
      showError("length mismatch")
      }
    //is number of pairs in phi const and phi const < segend - segbeg

    //check no residues are being targeted and constrained 
    return pdbid_is_4char & fname_is_string & chain_is_1char & segbeg_is_num & segend_is_num & itterations_is_num & lengths_fit


  }
  function showError(msg){
        document.getElementById("err_txt").innerText  = msg;
        document.getElementById("error_info").style.visibility = "visible"
  }

  function printStacks(){

    targ_phi_str = "";
    targ_psi_str = "";
    constr_phi_str = "";
    constr_psi_str = "";
  target_residues_phi_stack.forEach(element => {
    console.log(target_residues_phi_stack);
    console.log(element);
    targ_phi_str = targ_phi_str +" "+ element[0] +" "+ element[1] + ", "
  }); 
  target_residues_psi_stack.forEach(element => {
    targ_psi_str = targ_psi_str +" "+ element[0] +" "+ element[1] + ", "
  }); 
  constr_residues_phi_stack.forEach(element => {
    constr_phi_str = constr_phi_str +" "+ element + ", "

  }); 
  constr_residues_psi_stack.forEach(element => {
    constr_psi_str = constr_psi_str +" "+ element + ", "
  }); 
  document.getElementById("target_phi_string").innerHTML = targ_phi_str;
  document.getElementById("target_psi_string").innerHTML =targ_psi_str;
  document.getElementById("constr_residues_phi_string").innerHTML = constr_phi_str;
  document.getElementById("constr_residues_psi_string").innerHTML =constr_psi_str;
  }