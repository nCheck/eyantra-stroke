import XLSX from 'xlsx';



export default reader = ( uri )=>{

    const workbook = XLSX.readFile(uri);
    var flag=0;
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    console.log("hello")
    console.log(range.s.r , range.e.r)

}