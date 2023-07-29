$(document).ready(function(){

    let form = $("input[type='file']");
    let files = $(form[0]);
    let fileList = [];

    //This is the key component that allows us to interact with the file input filed
    let data = new DataTransfer();

    form.on('change', function(){

        for(let i = 0; i < files.prop('files').length; i++){
            //files pushed in array fileList
            fileList.push(files.prop('files')[i]);

            //Each file will have and id based on its position in the fileList array 
            fileId = fileList.length - 1;
            
            let cellFileName = (files.prop('files')[i].name.length > 35) ? `${files.prop('files')[i].name.substring(0, 35)} [...]` : files.prop('files')[i].name;

            //We then display the uploaded file(s)
            $("#bloc_files").append(`<tr id=pj_${fileId}><td class='col-12'><p class='col-8'>${cellFileName} &nbsp;&nbsp;&nbsp;<p class='col-1'><a href='' class='delete_pj text-danger' data-Pj=${fileId} data-fname='${files.prop('files')[i].name}'><i class='fa-solid fa-trash'></i><a/></p></p></td></tr>`);       
        }
        updateFileinput(fileList);

    })

    $("#bloc_files").on('click', '.delete_pj', function(e){
        e.preventDefault();

        let fileName = $(this).attr('data-fname');
        
        swal({
            title: `Supprimer '${fileName}'?`,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let pjId = $(this).attr('data-Pj');
                deletePj(pjId); 
            }
          });

    })

    /**
     * Allows us to update the form field and the fileList simultaneously
     * @param {array} fileListArray contains all the attachment files
     */
    function updateFileinput(fileListArray){
        data.items.clear()

        for(let file of fileListArray){
            if(file){
                data.items.add(file);
            }
        }

        form.val(null)
        form[0].files = data.files;
    }

    function deletePj(pjId){

        fileList[pjId] = null;
        updateFileinput(fileList);

        let row = $(`#pj_${pjId}`);
        row.remove();
    }
})