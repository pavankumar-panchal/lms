// JavaScript Document
function griddata(startlimit) {
	$("#gridprocess").html(processing());
	var passdata = "&submittype=griddata&dummy=" + Math.floor(Math.random() * 1000782200000);
	var querystring = "../ajax/subadminmaster.php";
	ajaxobjext6 = $.ajax(
		{
			type: "POST", url: querystring, data: passdata, cache: false,
			success: function (response, status) {
				if (response == 'Thinking to redirect') {
					window.location = "../logout.php";
					return false;
				}
				else {
					var ajaxresponse = response.split('^');
					if (ajaxresponse[0] == '1') {
						$("#gridprocess").html('');
						$("#tabgroupgridc1_1").html(ajaxresponse[1]);
						$("#getmorelink").html(ajaxresponse[2]);
						$("#totalcount").html("Total count : " + ajaxresponse[3]);
						$("#gridprocess").html('Sub-Admin Register');
					}
					else {
						$("#gridprocess").html(scripterror1());
					}
				}
			},
			error: function (a, b) {
				$("#gridprocess").html(scripterror1());
			}
		});
}




function formsubmit(command) {
	var form = $("#subadminform");
	var msg_box = $("#msg_box");
	var name = $("#form_name");
	var email = $("#form_email");
	var username = $("#form_username");
	var password = $("#form_password");
	var cell = $("#form_cell");
	var csrf_token = $("#csrf_token").val();  // Get CSRF token from hidden input

	if (name.val() == '') {
		msg_box.html(errormessage("Please Enter a Name."));
		name.focus();
		return false;
	}
	else if (email.val() == '') {
		msg_box.html(errormessage("Please Enter the email ID."));
		email.focus();
		return false;
	}
	else if (checkemail(email.val()) == false) {
		msg_box.html(errormessage("Please Enter Valid email ID."));
		email.focus();
		return false;
	}
	else if (!username.val()) {
		msg_box.html(errormessage("Please Enter the username."));
		username.focus();
		return false;
	}
	else if (!password.val()) {
		msg_box.html(errormessage("Please Enter the password."));
		password.focus();
		return false;
	}
	else if (!cell.val()) {
		msg_box.html(errormessage("Please Enter Cell Number."));
		cell.focus();
		return false;
	}
	else {
		if (!validatecell(cell.val())) {
			msg_box.html(errormessage("Please Enter Valid Cell Number."));
			cell.focus();
			return false;
		}
	}

	var disablelogin = ($('#form_disablelogin:checked').val() == 'on') ? 'yes' : 'no';
	var showmcacompanies = ($('#showmcacompanies:checked').val() == 'on') ? 'yes' : 'no';
	var transferuploadedleads = ($('#transferuploadedleads:checked').val() == 'on') ? '1' : '0';

	msg_box.html(processing());

	// Function to validate CSRF token before proceeding
	function validateCSRFToken(csrf_token, callback) {
		$.ajax({
			type: "POST",
			url: "../ajax/validate_csrf.php",  // Endpoint for validating CSRF token
			data: { csrf_token: csrf_token },
			success: function (response) {
				if (response == "valid") {
					callback(true); // Token is valid
				} else {
					callback(false); // Token is invalid
				}
			},
			error: function () {
				callback(false);
			}
		});
	}

	validateCSRFToken(csrf_token, function (isValid) {
		if (isValid) {
			if (command == 'save') {
				var passdata = "&submittype=save&form_recid=" + $("#form_recid").val() +
					"&form_name=" + $("#form_name").val() +
					"&form_email=" + $("#form_email").val() +
					"&form_username=" + $("#form_username").val() +
					"&form_password=" + $("#form_password").val() +
					"&transferuploadedleads=" + transferuploadedleads +
					"&form_disablelogin=" + disablelogin +
					"&showmcacompanies=" + showmcacompanies +
					"&form_cell=" + $("#form_cell").val() +
					"&csrf_token=" + csrf_token +  // Append CSRF token
					"&dummy=" + Math.floor(Math.random() * 1000782200000);

				var querystring = "../ajax/subadminmaster.php";

				// alert("Passing values:\n" + passdata);
			}
			else if (command == 'delete') {
				var passdata = "&submittype=delete&form_recid=" + $("#form_recid").val() +
					"&csrf_token=" + csrf_token +  // Append CSRF token
					"&dummy=" + Math.floor(Math.random() * 1000782200000);

				var querystring = "../ajax/subadminmaster.php";

				// alert("Passing values:\n" + passdata);
			}

			// Proceed with AJAX request after displaying the alert
			ajaxobjext7 = $.ajax({
				type: "POST",
				url: querystring,
				data: passdata,
				cache: false,
				success: function (response, status) {
					if (response == 'Thinking to redirect') {
						window.location = "../logout.php";
						return false;
					} else {
						var ajaxresponse = response.split('^');
						if (ajaxresponse[0] == '1') {
							msg_box.html(successmessage(ajaxresponse[1]));
							griddata('');
							newentry();
						} else if (ajaxresponse[0] == '2') {
							msg_box.html(errormessage(ajaxresponse[1]));
							griddata('');
						} else {
							msg_box.html(scripterror());
						}
					}
				},
				error: function (a, b) {
					$("#gridprocess").html(scripterror1());
				}
			});
		} else {
			// CSRF token is invalid
			msg_box.html(errormessage("Invalid CSRF token. Please refresh the page and try again."));
		}
	});

}






// function formsubmit(command) {
//     var form = $("#subadminform");
//     var msg_box = $("#msg_box");
//     var name = $("#form_name");
//     var email = $("#form_email");
//     var username = $("#form_username");
//     var password = $("#form_password");
//     var cell = $("#form_cell");
//     var csrf_token = $("#csrf_token").val();  // Get CSRF token from hidden input

//     if (name.val() == '') {
//         msg_box.html(errormessage("Please Enter a Name."));
//         name.focus();
//         return false;
//     }
//     else if (email.val() == '') {
//         msg_box.html(errormessage("Please Enter the email ID."));
//         email.focus();
//         return false;
//     }
//     else if (checkemail(email.val()) == false) {
//         msg_box.html(errormessage("Please Enter Valid email ID."));
//         email.focus();
//         return false;
//     }
//     else if (!username.val()) {
//         msg_box.html(errormessage("Please Enter the username."));
//         username.focus();
//         return false;
//     }
//     else if (!password.val()) {
//         msg_box.html(errormessage("Please Enter the password."));
//         password.focus();
//         return false;
//     }
//     else if (!cell.val()) {
//         msg_box.html(errormessage("Please Enter Cell Number.")); 
//         cell.focus(); 
//         return false;
//     }
//     else {
//         if (!validatecell(cell.val())) {
//             msg_box.html(errormessage("Please Enter Valid Cell Number."));
//             cell.focus();
//             return false;
//         }
//     }

//     var disablelogin = ($('#form_disablelogin:checked').val() == 'on') ? 'yes' : 'no';
//     var showmcacompanies = ($('#showmcacompanies:checked').val() == 'on') ? 'yes' : 'no';
//     var transferuploadedleads = ($('#transferuploadedleads:checked').val() == 'on') ? '1' : '0';

//     msg_box.html(processing());

//     if (command == 'save') {
//         var passdata = "&submittype=save&form_recid=" + $("#form_recid").val() +
//                        "&form_name=" + $("#form_name").val() +
//                        "&form_email=" + $("#form_email").val() +
//                        "&form_username=" + $("#form_username").val() +
//                        "&form_password=" + $("#form_password").val() +
//                        "&transferuploadedleads=" + transferuploadedleads +
//                        "&form_disablelogin=" + disablelogin +
//                        "&showmcacompanies=" + showmcacompanies +
//                        "&form_cell=" + $("#form_cell").val() +
//                        "&csrf_token=" + csrf_token +  // Append CSRF token
//                        "&dummy=" + Math.floor(Math.random() * 1000782200000);

//         var querystring = "../ajax/subadminmaster.php";

//         // Show all passing values in alert
//         alert("Passing values:\n" + passdata);
//     }
//     else if (command == 'delete') {
//         var passdata = "&submittype=delete&form_recid=" + $("#form_recid").val() +
//                        "&csrf_token=" + csrf_token +  // Append CSRF token
//                        "&dummy=" + Math.floor(Math.random() * 1000782200000);

//         var querystring = "../ajax/subadminmaster.php";

//         // Show passing values for delete as well
//         alert("Passing values:\n" + passdata);
//     }

//     // Proceed with AJAX request after displaying the alert
//     ajaxobjext7 = $.ajax({
//         type: "POST",
//         url: querystring,
//         data: passdata,
//         cache: false,
//         success: function (response, status) {
//             if (response == 'Thinking to redirect') {
//                 window.location = "../logout.php";
//                 return false;
//             } else {
//                 var ajaxresponse = response.split('^');
//                 if (ajaxresponse[0] == '1') {
//                     msg_box.html(successmessage(ajaxresponse[1]));
//                     griddata('');
//                     newentry();
//                 } else if (ajaxresponse[0] == '2') {
//                     msg_box.html(errormessage(ajaxresponse[1]));
//                     griddata('');
//                 } else {
//                     msg_box.html(scripterror());
//                 }
//             }
//         },
//         error: function (a, b) {
//             $("#gridprocess").html(scripterror1());
//         }
//     });
// }





function newentry() {
	//document.getElementById("msg_box").innerHTML = '';
	$("#form_recid").val('');
	$("#subadminform")[0].reset();
	enablesave();
	disabledelete();
}

function gridtoform(id) {
	var form = $("#subadminform");
	$("#gridprocess").html(processing());
	var passdata = "&submittype=gridtoform&form_recid=" + id + "&dummy=" + Math.floor(Math.random() * 1000782200000);
	var querystring = "../ajax/subadminmaster.php";
	ajaxobjext8 = $.ajax(
		{
			type: "POST", url: querystring, data: passdata, cache: false,
			success: function (response, status) {
				if (response == 'Thinking to redirect') {
					window.location = "../logout.php";
					return false;
				}
				else {
					var ajaxresponse = response.split('^');
					if (ajaxresponse[0] == '1') {
						$("#gridprocess").html('');
						$('#form_recid').val(ajaxresponse[1]);
						$('#form_name').val(ajaxresponse[2]);
						$('#form_email').val(ajaxresponse[3]);
						$('#form_username').val(ajaxresponse[4]);
						$('#form_password').val(ajaxresponse[5]);
						$('#hiddenpwd').html(ajaxresponse[5]);
						if (ajaxresponse[6] == "1")
							$("#transferuploadedleads").attr('checked', true);
						else
							$("#transferuploadedleads").attr('checked', false);
						autochecknew($("#form_disablelogin"), ajaxresponse[7]);
						autochecknew($("#showmcacompanies"), ajaxresponse[9]);
						$('#form_cell').val(ajaxresponse[8]);
						$('#msg_box').html('');
						enabledelete();
						enablesave();
					}
					else {
						$('#msg_box').html(scripterror());
					}
				}
			},
			error: function (a, b) {
				$('#msg_box').html(scripterror());
			}
		});
}

function getmorerecords(startlimit, slnocount, showtype) {
	$("#gridprocess").html(processing());
	var passdata = "&submittype=griddata&startlimit=" + startlimit + "&slnocount=" + slnocount + "&showtype=" + showtype; //alert(passdata)
	var querystring = "../ajax/subadminmaster.php";
	ajaxobjext9 = $.ajax(
		{
			type: "POST", url: querystring, data: passdata, cache: false,
			success: function (response, status) {
				if (response == 'Thinking to redirect') {
					window.location = "../logout.php";
					return false;
				}
				else {
					var ajaxresponse = response.split('^');
					if (ajaxresponse[0] == '1') {
						$("#gridprocess").html('');
						$('#resultgrid').html($('#tabgroupgridc1_1').html());
						$('#tabgroupgridc1_1').html($('#resultgrid').html().replace(/\<\/table\>/gi, '') + ajaxresponse[1]);
						$('#getmorelink').html(ajaxresponse[2]);
						$('#totalcount').html("Total Count :  " + ajaxresponse[3]);
						$("#gridprocess").html('Sub-Admin Register');
					}
					else {
						$("#gridprocess").html(scripterror1());
					}
				}
			},
			error: function (a, b) {
				$("#gridprocess").html(scripterror1());
			}
		});
}