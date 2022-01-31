$("#add_user").submit(function(event){
    $("#hidden_input").val(editor.getMarkdown());
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    // console.log('hello');
    $("#hidden_input").val(editor.getMarkdown());
    
    event.preventDefault();
    
    var unindexed_array = $(this).serializeArray();
    var data = {};
    
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    });
    
    // data['image'] = $('#attachFile')[0].files[0];
    // console.log(data);

    // https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
    // - contentType : false 로 선언 시 content-type 헤더가 multipart/form-data로 전송되게 함
    // - processData : false로 선언 시 formData를 string으로 변환하지 않음

    var request = {
        "url" : `http://localhost:8080/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data,
        // async: false,
        // processData: false,
        // contentType: false
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

    const img = $('#attachFile')[0].files[0]
    if (img){
        console.log('이미지 전송');
        const data2 = new FormData();
        data2.append("image", img);
        var request2 = {
            "url" : `http://localhost:8080/api/users/${data.id}`,
            "method" : "PUT",
            "data" : data2,
            // async: false,
            processData: false,
            contentType: false
        }
    
        $.ajax(request2).done(function(response){
            alert("Image Updated Successfully!");
        })
    }
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:8080/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
