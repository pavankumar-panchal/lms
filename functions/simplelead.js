// JavaScript Document

function checkForMatchingRows() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        if (xmlhttp.responseText.trim() !== "No rows found") {
          // If a match is found, display an alert
          alert(xmlhttp.responseText);
        }
      }
    }
  };

  xmlhttp.open("GET", "../ind.php", true);
  xmlhttp.send();
}

// Call the function every 20 seconds (adjust as needed)
setInterval(checkForMatchingRows, 20000); // 20 seconds
$(document).ready(function () {
  // Function to add a new product row
  function addProductRow() {
    var rowCount = $("#adddescriptionrows tr").length;
    var newRow =
      "<tr>" +
      '<td width="5%"><div align="left"><strong>' +
      (rowCount + 1) +
      "</strong></div></td>" +
      '<td width="11%"><div align="center"><input name="productName[]" type="text" class="swifttext type_enter focus_redclass" style="width:115px" maxlength="70" autocomplete="off"/></div></td>' +
      '<td width="16%"><div align="center"><select name="purchaseType[]" style="width:110px" class="swiftselect-mandatory type_enter focus_redclass"><option value="" selected="selected">--Select--</option><option value="New">New</option><option value="Updation">Updation</option></select></div></td>' +
      '<td width="18%"><div align="center"><select name="usageType[]" style="width:110px" class="swiftselect-mandatory type_enter focus_redclass"><option value="" selected="selected">--Select--</option><option value="Single User">Single User</option><option value="Multi User">Multi User</option></select></div></td>' +
      '<td width="15%"><div align="center"><input name="amount[]" type="text" class="swifttext type_enter focus_redclass" style="width:100px" maxlength="10" autocomplete="off"/></div></td>' +
      '<td width="8%"><font color="#FF0000"><strong><a onclick="removeProductRow(this)" style="cursor:pointer; width:10px; ">X</a></strong></font><input type="hidden" name="contactslno[]" /></td>' +
      "</tr>";
    $("#adddescriptionrows").append(newRow);
  }

  // Function to remove the product row
  function removeProductRow(anchor) {
    var rowCount = $("#adddescriptionrows tr").length;
    if (rowCount > 1) {
      $(anchor).closest("tr").remove();
      // Update the serial numbers after removing a row
      $("#adddescriptionrows tr").each(function (index) {
        $(this)
          .find("td:first")
          .find("strong")
          .text(index + 1);
      });
    }
  }

  // Event handler for adding more product rows
  $("#adddescriptionrowdiv a").click(function () {
    addProductRow();
  });

  // Event handler for removing product rows
  $("#adddescriptionrows").on("click", "a", function () {
    removeProductRow(this);
  });
});

var myValue = "";
var fieldlength = "";
function tooltip(type) {
  if (ns6 || ie) {
    tipobj.style.display = "block";
    if (type == "Dealer") {
      tipobj.innerHTML = document.getElementById("hiddendealertext").value; //alert(tipobj.innerHTML);
      enabletip = true;
      return false;
    } else if (type == "Manager") {
      tipobj.innerHTML = document.getElementById("hiddenmanagertext").value; //alert(tipobj.innerHTML);
      enabletip = true;
      return false;
    } else if (type == "All") {
      tipobj.innerHTML = document.getElementById("hiddengivenbytext").value; // alert(tipobj.innerHTML);
      enabletip = true;
      return false;
    }
  }
}

function getmynumber() {
  var passdata =
    "&submittype=getcontactnumber&dummy=" +
    Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/simplelead.php";
  ajaxobjext80 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response1 = response.split("^"); //alert(response1);
        if (response1[0] == "1") {
          if (response1[1] != "") {
            myValue = "Contact: " + response1[1];
            fieldlength = myValue.length;
          } else {
            myValue = "";
          }
        }
        if (response1[0] == "2") {
          myValue = "";
        }
      }
    },
    error: function (a, b) {
      $("#sms-error").html(scripterror());
    },
  });
}


function insertAtCursor(myField) {
  //IE support
  if ($("#mynumber").is(":checked") == true) {
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == "0") {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  } else if ($("#mynumber").is(":checked") == false) {
    var finaltext = "";
    var text = myField.value;
    if (document.selection) {
      myField.focus();
      finaltext = text.replace(myValue, "");
      sel = document.selection.createRange();
      myField.value = finaltext;
      sel.text = finaltext;
      countsmslength();
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == "0") {
      finaltext = text.replace(myValue, ""); //alert(finaltext)
      myField.value = finaltext;
      countsmslength();
    } else {
      myField.value += myValue;
    }
  }
}


function griddata(startlimit) {
  $("#gridprocess").html(processing());
  $("hiddenid").val("");
  leadtrack("tracker");
  $("#saveconfirm").attr("checked", false);
  $("#form_leadstatus").val("");
  var passdata =
    "&submittype=griddata&dummy=" + Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/simplelead.php";
  ajaxobjext55 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response1 = response.split("|^|"); //alert(response1);
        if (response1[0] == "1") {
          $("#tabgroupgridc1_1").html(response1[1]);
          $("#getmorelink").html(response1[2]);
          $("#gridprocess").html(
            '<font color="#FFFFFF"><strong>&nbsp; List of Leads => [Leads of Last 2 Days (' +
              response1[3] +
              " Records)] </strong></font>"
          );
        } else if (response1[0] == "2") {
          $("#tabgroupgridc1_1").html(response1[1]);
          $("#getmorelink").html(response1[2]);
          $("#gridprocess").html(
            '<font color="#FFFFFF"><strong>&nbsp; List of Leads => [Leads of Last 2 Days (' +
              response1[3] +
              " Records)]</strong></font>"
          );
        } else {
          $("#gridprocess").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#gridprocess").html(scripterror1());
    },
  });
}



function filtering(command) {
  var form = $("#filterform");
  var msg_box = $("#msg_box2");
  var textfield = $("#searchcriteria").val();
  var subselection = $("input[name='databasefield']:checked").val();
  var datatype = $("input[name='datatype']:checked").val();
  var selectedvalue = $("#productid");
  $("#hiddenproductid").val($("#productid").val());
  var followuppending = $("#followuppending");
  var followupmade = $("#followupmade");
  var remarks = $("#remarks");
  // selected optgroup label
  var grouplabel = "";
  if ($("#productid").val() != "") {
    grouplabel = $("#productid :selected").parents("OPTGROUP").attr("label");
    $("#hiddengrouplabel").val(grouplabel);
  }
  var field = $("#DPC_fromdate");
  if (!field.val()) {
    msg_box.html(errormessage("Please Enter 'From date'."));
    field.focus();
    return false;
  }
  if (checkdate(field.val()) == false) {
    msg_box.html(errormessage("Enter a valid 'From date' [dd-mm-yyyy]."));
    field.focus();
    return false;
  }
  var field = $("#DPC_todate");
  if (!field.val()) {
    msg_box.html(errormessage("Please Enter 'To Date'."));
    field.focus();
    return false;
  }
  if (checkdate(field.val()) == false) {
    msg_box.html(errormessage("Enter a valid 'To date' [dd-mm-yyyy]."));
    field.focus();
    return false;
  }
  if (
    compare2dates($("#DPC_fromdate").val(), $("#DPC_todate").val()) == false
  ) {
    msg_box.html(errormessage("From date cannot be greater than To date."));
    $("#DPC_fromdate").focus();
    return false;
  }

  if ($("#considerfollowup:checked").val() == "on") {
    var field = $("#DPC_filter_followupdate1");
    if (!field.val()) {
      msg_box.html(errormessage("Please Enter 'Followup From date'."));
      field.focus();
      return false;
    }
    if (checkdate(field.val()) == false) {
      msg_box.html(
        errormessage("Enter a valid 'Followup From date' [dd-mm-yyyy].")
      );
      field.focus();
      return false;
    }
    var field = $("#DPC_filter_followupdate2");
    if (!field.val()) {
      msg_box.html(errormessage("Please Enter 'Followup To Date'."));
      field.focus();
      return false;
    }
    if (checkdate(field.val()) == false) {
      msg_box.html(
        errormessage("Enter a valid 'Followup To date' [dd-mm-yyyy].")
      );
      field.focus();
      return false;
    }
    if (
      compare2dates(
        $("#DPC_filter_followupdate1").val(),
        $("#DPC_filter_followupdate2").val()
      ) == false
    ) {
      msg_box.html(
        errormessage(
          "Followup From date cannot be greater than Followup To date."
        )
      );
      $("#DPC_filter_followupdate1").focus();
      return false;
    }

    var filter_followupdate1 = $("#DPC_filter_followupdate1").val();
    $("#filter_followupdate1hdn").val($("#DPC_filter_followupdate1").val());
    var filter_followupdate2 = $("#DPC_filter_followupdate2").val();
    $("#filter_followupdate2hdn").val($("#DPC_filter_followupdate2").val());

    if ($("#followuppending").is(":checked") == true) {
      var followupcheck = "followuppending";
    } else if ($("#followupmade").is(":checked") == true) {
      var followupcheck = "followupmade";
    }
  } else {
    var filter_followupdate1 = "dontconsider";
    $("#filter_followupdate1hdn").val("dontconsider");
    var filter_followupdate2 = "dontconsider";
    $("#filter_followupdate2hdn").val("dontconsider");
    var followupcheck = "";
  }
  if ($("#dropterminatedstatus:checked").val() == "true") {
    var dropterminatedstatus = "true";
  } else {
    var dropterminatedstatus = "false";
  }

  if (command == "excel") $("#filterform").submit();
  else if (command == "resetform") {
    form[0].reset();
    filterfollowupdates();
  } else {
    $("#gridprocessf").html(
      processing() +
        "  " +
        '<span onclick = "abortajaxprocess(\'initial\')" class="abort">(STOP)</span>'
    );
    $("#hiddenfromdate").val($("#DPC_fromdate").val());
    $("#hiddentodate").val($("#DPC_todate").val());
    $("#hiddendealerid").val($("#dealerid").val());
    $("#hiddengivenby1").val($("#givenby").val());
    $("#hiddenleadstatus").val($("#leadstatus").val());
    $("#hiddenleadsubstatus").val($("#leadsubstatus").val());
    $("#srchhiddenfield").val(textfield); //alert(textfield);
    $("#subselhiddenfield").val(subselection); //alert(subselection);
    $("#datatypehiddenfield").val(datatype); //alert(datatype);
    $("#followedbyhidden").val($("#followedby").val()); // alert(form.followedby.value)
    $("#hiddensource").val($("#form_source").val()); //alert(form.form_source.value);

    leadgridtab5("5", "tabgroupleadgrid", "searchresult");
    var passdata =
      "&submittype=filter&fromdate=" +
      encodeURIComponent($("#DPC_fromdate").val()) +
      "&todate=" +
      encodeURIComponent($("#DPC_todate").val()) +
      "&dealerid=" +
      encodeURIComponent($("#dealerid").val()) +
      "&givenby=" +
      encodeURIComponent($("#givenby").val()) +
      "&productid=" +
      encodeURIComponent($("#productid").val()) +
      "&leadstatus=" +
      encodeURIComponent($("#leadstatus").val()) +
      "&leadsubstatus=" +
      encodeURIComponent($("#leadsubstatus").val()) +
      "&filter_followupdate1=" +
      encodeURIComponent(filter_followupdate1) +
      "&filter_followupdate2=" +
      encodeURIComponent(filter_followupdate2) +
      "&dropterminatedstatus=" +
      encodeURIComponent(dropterminatedstatus) +
      "&searchtext=" +
      encodeURIComponent($("#srchhiddenfield").val()) +
      "&subselection=" +
      encodeURIComponent($("#subselhiddenfield").val()) +
      "&datatype=" +
      encodeURIComponent($("#datatypehiddenfield").val()) +
      "&followedby=" +
      encodeURIComponent($("#followedbyhidden").val()) +
      "&leadsource=" +
      encodeURIComponent($("#hiddensource").val()) +
      "&grouplabel=" +
      grouplabel +
      "&followupcheck=" +
      followupcheck +
      "&remarks=" +
      remarks.val() +
      "&dummy=" +
      Math.floor(Math.random() * 10230000000); //alert(passdata);
    var queryString = "../ajax/simplelead.php";
    ajaxobjext56 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var response2 = response.split("|^|"); //alert(response)
          if (response2[0] == "1") {
            $("#tabgroupgridf1_1").html(response2[1]);
            $("#getmorelinkf1").html(response2[2]);
            $("#gridprocessf").html(
              ' <font color="#FFFFFF">=> Filter Applied (' +
                response2[3] +
                " Records)</font>"
            );
            msg_box.html("");
          } else if (response2[0] == "2") {
            $("#msg_box2").html(errormessage(response2[1]));
            $("#gridprocessf").html("");
          } else if (response2[0] == "3") {
            $("#tabgroupgridf1_1").html(errormessage(response2[1]));
            $("#gridprocessrf").html("");
          } else {
            $("#gridprocessrf").html(scripterror1());
          }
        }
      },
      error: function (a, b) {
        $("#gridprocessrf").html(scripterror1());
      },
    });
  }
}

function resetForm() {
  var form = document.getElementById("quoteForm");
  form.reset();
  $("#adddescriptionrows tr").not(':first').remove(); // Remove all rows except the first one
}



function gridtoform(id) {
  resetForm();
  sendsms("reset");
  resetproductchange();
  $("#showeditimage").hide();
  $("#leadremarksbox").hide();
  var error = $("#messagebox1");
  if (
    $("#hiddentype").val() == "Admin" ||
    $("#hiddentype").val() == "Sub Admin" ||
    $("#hiddentype").val() == "Reporting Authority"
  ) {
    $("#selectlist").hide();
  } else if ($("#hiddentype").val() == "Dealer") {
    $("selectlist1").hide();
  }
  if ($("#hiddenid").val() != id) {
    leadtrack("tracker");
  }
  //document.getElementById("gridprocess").innerHTML = processing();
  error.html("");
  //document.getElementById('msg_box').innerHTML = '';
  var passdata =
    "&submittype=gridtoform&form_recid=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext59 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response3 = response.split("|^|"); // alert(response3);
        if (response3[0] == "1") {
          $("#help").show();
          $("#help1").show();
          $("#help2").show();
          if (
            $("#hiddentype").val() == "Admin" ||
            $("#hiddentype").val() == "Sub Admin" ||
            $("#hiddentype").val() == "Reporting Authority"
          ) {
            //document.getElementById('displaydiv').style.display = 'block';
            $("#link").show();
            $("#dealerlist1").val("");
          } else if ($("#hiddentype").val() == "Dealer") {
            $("#link1").show();
            $("#dealermemberlist").val("");
          }
          $("#form_recid").val(response3[1]); //alert($('#form_recid').val())
          $("#hiddenid").val(response3[3]); //alert(document.getElementById('hiddenid').value );
          $("#id").html(response3[2] + " " + "[" + response3[3] + "]");
          $("#hiddencompany").val(
            response3[2] + " " + "[" + response3[3] + "]"
          );
          $("#newleadcompany").html(response3[2]);
          $("#hiddennewleadcompany").val(response3[2]);
          $("#contactperson").val(response3[4]);
          $("#hiddencontact").val(response3[4]);
          $("#newleadcontactperson").val(response3[4]);
          $("#hiddennewleadcontact").val(response3[4]);
          $("#address").val(response3[5]);
          $("#hiddenaddress").val(response3[5]);
          $("#district").html(response3[6] + " " + "/" + " " + response3[7]);
          $("#hiddendistrictstate").val(
            response3[6] + " " + "/" + " " + response3[7]
          );
          $("#stdcode").val(response3[8]);
          $("#hiddenstdcode").val(response3[8]);
          $("#phone").val(response3[9]);
          $("#hiddenphone").val(response3[9]);
          $("#cell").val(response3[10]);
          $("#hiddencell").val(response3[10]);
          $("#smscell").html(response3[10]);
          $("#hiddensmscell").val(response3[10]);
          $("#newleadcell").val(response3[10]);
          $("#hiddennewleadcell").val(response3[10]);
          $("#emailid").val(response3[11]);
          $("#hiddenemailid").val(response3[11]);
          $("#newleademailid").val(response3[11]);
          $("#hiddennewleademailid").val(response3[11]);
          $("#referencetype").html(
            response3[12] + " " + "[" + response3[13] + "]"
          );
          $("#hiddenreference").val(
            response3[12] + " " + "[" + response3[13] + "]"
          );
          $("#newleadsource").val(response3[12]);
          $("#hiddennewleadsource").val(response3[12]);
          $("#givenby1").html(response3[14]);
          $("#hiddengivenby").val(response3[14]);
          $("#dateoflead").html(response3[15]);
          $("#hiddendateoflead").val(response3[15]);
          $("#dealerviewdate").html(response3[16]);
          $("#hiddendealerviewdate").val(response3[16]);
          $("#product1").html(response3[17]);
          $("#hiddenproduct").val(response3[17]); //alert(response3[17])
          $("#dealer1").html(response3[33]);
          $("#dealer2").html(response3[34]);
          $("#hiddendealer").val(response3[18]);
          $("#manager").html(response3[20]);
          $("#hiddenmanager").val(response3[20]);
          $("#form_leadstatus").val(response3[21]);
          //autoselect('form_leadstatus',response3[21]);
          $("#leadremarks").html(response3[24]);
          if (response3[24] != "Not Available") {
            $("#hiddenleadremarks").val(response3[24]);
          } else $("#hiddenleadremarks").val("");

          $("#hiddengivenbytext").val(response3[27]);
          $("#hiddendealertext").val(response3[28]); //alert( response3[28]);
          $("#hiddenmanagertext").val(response3[29]); //alert( response3[29]);
          //document.getElementById('productchangeform').productchangeselect.value = response3[30];
          $("#changeproductdealerlist").val(response3[31]);
          $("#msg_box").html("");
          jumpToAnchor("leadview");
          showfollowups(response3[1]); //alert(response3[1])
          showsmslogs(response3[3], "");
          //newfollowup();
          if (response3[26] == response3[32]) {
            $("#showeditimage").show();
          }
          //alert(response3[21]);
          if (response3[21] == "Requirement Does not Meet") {
            ///$('#form_leadMeetRemarks').hide();
            $("#leadMeetRemarks").show();
            $("#leadMeetRemarks").val(response3[35]);
            //alert(response3[35]);
          } else {
            $("#leadMeetRemarks").hide();
            $("#leadMeetRemarks").val("");
          }

          if (response3[21] == "Not Interested") {
            $("#form_subleadstatus").show();
            $("#form_subleadstatus").val(response3[36]);
            if (
              response3[36] == "Requirement does not match" ||
              response3[36] == "Other"
            ) {
              $("#leadMeetRemarks").show();
              $("#leadMeetRemarks").val(response3[35]);
            } else {
              $("#leadMeetRemarks").hide();
              $("#leadMeetRemarks").val("");
            }
          } else {
            $("#form_subleadstatus").hide();
            $("#form_subleadstatus").val("");
          }
          checkDataRow(response3[3]);
        } else {
          $("#msg_box").html("");
        }
      }
    },
    error: function (a, b) {
      $("#tabgroupgridc1_1").html(scripterror1());
    },
  });
}






function formsubmited(command) {
  $("#tabgroupgridh2").trigger("click");
  window.setTimeout(mydemovalue, 3000);
}



function mydemovalue() {
  //var td = $("td:contains(Demo Given)");
  if (
    $("#tabgroupgridc1_2 #gridtable1 td:contains(Demo Given)").length &&
    $("#form_leadstatus").val() == "Demo Given"
  ) {
    alert("Demo Given Status Can Not be Repeated");
  } else if (
    $("#tabgroupgridc1_2 #gridtable1 td:contains(Quote Sent)").length &&
    $("#form_leadstatus").val() == "Quote Sent"
  ) {
    alert("Quote Sent Status Can Not be Repeated");
  } else if (
    $("#tabgroupgridc1_2 #gridtable1 td:contains(Perusing to Purchase)")
      .length &&
    $("#form_leadstatus").val() == "Perusing to Purchase"
  ) {
    alert("Perusing to Purchase Status Can Not be Repeated");
  } else if (
    $("#tabgroupgridc1_2 #gridtable1 td:contains(Order Closed)").length &&
    $("#form_leadstatus").val() == "Order Closed"
  ) {
    alert("Order Closed Status Can Not be Repeated");
  } else if (
    $("#tabgroupgridc1_2 #gridtable1 tr:last").find("td:nth-child(2)").html() ==
      "Not Interested" &&
    $("#tabgroupgridc1_2 #gridtable1 tr").length == "2"
  ) {
    alert("Status Can not Be updated as Lead Directed Set To Not Interested");
    //alert($('#tabgroupgridc1_2 #gridtable1 tr').length);
    //alert($("#tabgroupgridc1_2 #gridtable1 tr:last").prev().find("td:nth-child(2)").html());
  } else {
    formsubmit("save");
  }
  //alert(td);
}
function formsubmit(command) {
  var val = "Are you sure you want to UPDATE the staus of this lead?";
  var form_recid = $("#form_recid");
  var form_leadstatus = $("#form_leadstatus");
  var form_subleadstatus = $("#form_subleadstatus");
  var msg_box = $("#msg_box");
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  //added on 30-07-2020
  var form_leadMeetRemarks = $("#leadMeetRemarks");
  //form_leadMeetRemarks.hide();
  //alert($('#form_leadstatus').val());

  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == ""
  ) {
    msg_box.html(errormessage("Please Select a Lead First"));
    return false;
  }
  if (!form_recid.val()) {
    msg_box.html(errormessage("Please Select a Lead to Update."));
    return false;
  }
  if (!form_leadstatus.val()) {
    msg_box.html(errormessage("Please Select the current status of the Lead."));
    form_leadstatus.focus();
    return false;
  }
  if (form_leadstatus.val() == "Requirement Does not Meet") {
    if (!form_leadMeetRemarks.val()) {
      msg_box.html(errormessage("Please enter remarks."));
      form_leadMeetRemarks.focus();
      return false;
    }
  }

  if (form_leadstatus.val() == "Not Interested") {
    if (!form_subleadstatus.val()) {
      msg_box.html(errormessage("Please Select status."));
      form_leadMeetRemarks.focus();
      return false;
    }

    if (
      form_subleadstatus.val() == "Requirement does not match" ||
      form_subleadstatus.val() == "Other"
    ) {
      if (!form_leadMeetRemarks.val()) {
        msg_box.html(errormessage("Please enter remarks."));
        form_leadMeetRemarks.focus();
        return false;
      }
    }
  }
  //exit;
  var confirmation = confirm(val);
  if (confirmation) {
    msg_box.html(processing());
    var passdata =
      "&submittype=save&form_recid=" +
      form_recid.val() +
      "&form_leadstatus=" +
      encodeURIComponent(form_leadstatus.val()) +
      "&form_subleadstatus=" +
      encodeURIComponent(form_subleadstatus.val()) +
      "&form_leadMeetRemarks=" +
      encodeURIComponent(form_leadMeetRemarks.val()) +
      "&dummy=" +
      Math.floor(Math.random() * 10230000000); //alert(passdata)
    //alert(passdata);
    var queryString = "../ajax/simplelead.php";
    ajaxobjext60 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse4 = response.split("^"); //alert(ajaxresponse4);
          if (ajaxresponse4[0] == "1") {
            //gridtoform(form_recid.value);
            msg_box.html(successmessage(ajaxresponse4[1]));
            updatestatusstrip();
          } else if (ajaxresponse4[0] == "2") {
            //alert(ajaxresponse4[1]);
            msg_box.html(errormessage(ajaxresponse4[1]));
            gridtoform(form_recid.value);
          } else {
            msg_box.html(scripterror());
          }
        }
      },
      error: function (a, b) {
        msg_box.html(scripterror());
      },
    });
  } else {
    return false;
  }
}

function addfollowup() {
  var form_recid = $("#form_recid");
  var form_leadremarks = $("#form_leadremarks");
  var followupdate = $("#followupdate");
  var followuptime = $("#followuptime");
  var followupmessage = $("#followupmessage");

  if (!form_recid.val()) {
    followupmessage.html(errormessage("Please Select a Lead."));
    return false;
  }
  if (!form_leadremarks.val()) {
    followupmessage.html(errormessage("Please Enter the remarks."));
    form_leadremarks.focus();
    return false;
  }
  if (followupdate.val() == "dd-mm-yyyy") {
    followupdate.val("");
  }
  if (followupdate.val()) {
    if (checkdate(followupdate.val()) == false) {
      followupmessage.html(
        errormessage("Enter a valid 'Follow-up Date' [dd-mm-yyyy].")
      );
      followupdate.focus();
      return false;
    }
  }
  followupmessage.html(processing());
  var passdata =
    "&submittype=addfollowup&form_recid=" +
    form_recid.val() +
    "&form_leadremarks=" +
    encodeURIComponent(form_leadremarks.val()) +
    "&followupdate=" +
    encodeURIComponent($("#DPC_followupdate").val()) +
    "&followuptime=" +
    encodeURIComponent($("#DPC_followuptime").val()) +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000);
  queryString = "../ajax/simplelead.php";
  ajaxobjext61 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response5 = response.split("|^|");
        if (response5[0] == 0) {
          showfollowups(form_recid.val());
          newfollowup();
        } else if (response5[0] == 1) {
          followupmessage.html(errormessage(response5[1]));
        }
      }
    },
    error: function (a, b) {
      followupmessage.html(errormessage(response5[1]));
    },
  });
}

function showfollowups(leadid) {
  //var form_recid = $("#form_recid");
  $("#followupmessage").html(processing());
  var passdata =
    "&submittype=showfollowups&form_recid=" +
    leadid +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/simplelead.php";
  ajaxobjext62 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response6 = response.split("^");
        if (response6[0] == "1") {
          $("#smallgrid").html(response6[1]);
          $("#followupmessage").html("");
          gridtab5("1", "tabgroupgrid", "followup");
        } else {
          $("#followupmessage").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#followupmessage").html(scripterror1());
    },
  });
}
//

function followuptoform(followupid) {
  var passdata =
    "&submittype=followuptoform&followupid=" +
    followupid +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/simplelead.php";

  $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: handleSuccess,
    error: handleError,
  });

  function handleSuccess(response, status) {
    if (response.trim() === "Thinking to redirect") {
      window.location = "../logout.php";
    } else {
      var responseArray = response.split("|^|");
      if (responseArray.length >= 3 && responseArray[0] === "1") {
        $("#form_leadremarks").val(responseArray[1]);
        cleantext("DPC_followupdate", "");
        $("#DPC_followupdate").val(responseArray[2]);
        cleantext("DPC_followuptime", "");
        $("#DPC_followuptime").val(responseArray[3]);
        $("#followupmessage").html("");
        disableadd();
      } else {
        $("#followupmessage").html(scripterror());
      }
    }
  }

  function handleError(xhr, status, error) {
    console.error("AJAX Error:", status, error);
    $("#followupmessage").html(scripterror());
  }
}

//
function followuptoform(followupid) {
  var passdata =
    "&submittype=followuptoform&followupid=" +
    followupid +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/simplelead.php";
  ajaxobjext63 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var response7 = response.split("|^|");
        if (response7[0] == "1") {
          $("#form_leadremarks").val(response7[1]);
          cleantext("DPC_followupdate", "");
          $("#DPC_followupdate").val(response7[2]);
          cleantext("DPC_followuptime", "");
          $("#DPC_followuptime").val(response7[3]);
          $("#followupmessage").html("");
          disableadd();
        } else {
          $("#followupmessage").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#followupmessage").html(scripterror());
    },
  });
}

function newfollowup() {
  $("#form_leadremarks").val("");
  $("#followupdate").val("");
  $("#DPC_followupdate").val("");
  $("#followupdate").val("");
  $("#DPC_followuptime").val("");
  $("#followupmessage").html("");
  enableadd();
}

function enableadd() {
  if ($("#addfollowup")) $("#addfollowup").attr("disabled", false);
}

function disableadd() {
  if ($("#addfollowup")) $("#addfollowup").attr("disabled", true);
}

function filterfollowupdates() {
  var considerfollowup = $("#considerfollowup");
  var filter_followupdate2 = $("#DPC_filter_followupdate2");
  var filter_followupdate1 = $("#DPC_filter_followupdate1");
  var followedby = $("#followedby");
  var remarks = $("#remarks");
  var followupmade = $("#followupmade");
  var followuptime = $("#followuptime");
  var followuppending = $("#followuppending");
  if ($("#considerfollowup:checked").val() != "on") {
    filter_followupdate1.attr("disabled", true);
    filter_followupdate2.attr("disabled", true);
    followedby.attr("disabled", true);
    //remarks.attr('disabled',true);
    followupmade.attr("disabled", true);
    followuppending.attr("disabled", true);
  } else if ($("#considerfollowup:checked").val() == "on") {
    filter_followupdate1.attr("disabled", false);
    filter_followupdate2.attr("disabled", false);
    followedby.attr("disabled", false);
    //remarks.attr('disabled',false);
    followupmade.attr("disabled", false);
    followuppending.attr("disabled", false);
  }
}

function getmorerecords(startlimit, slnocount, showtype, type) {
  var form = $("#filterform");
  var followuppending = $("#followuppending");
  var followupmade = $("#followupmade");
  var remarks = $("#remarks");
  if ($("#followuppending").is(":checked") == true) {
    var followupcheck = "followuppending";
  } else if ($("#followupmade").is(":checked") == true) {
    var followupcheck = "followupmade";
  }
  if ($("#dropterminatedstatus:checked").val() == "true") {
    var dropterminatedstatus = "true";
  } else {
    var dropterminatedstatus = "false";
  }
  if (type == "lead") {
    $("#gridprocess").html(processing());
    var passdata =
      "&submittype=griddata&startlimit=" +
      startlimit +
      "&slnocount=" +
      slnocount +
      "&showtype=" +
      showtype; //alert(passdata)
    var queryString = "../ajax/simplelead.php"; //alert(passdata);
    ajaxobjext57 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse = response.split("|^|"); //alert(ajaxresponse);
          if (ajaxresponse[0] == "1") {
            $("#resultgrid").html($("#tabgroupgridc1_1").html());
            $("#tabgroupgridc1_1").html(
              $("#resultgrid")
                .html()
                .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
            );
            $("#getmorelink").html(ajaxresponse[2]);
            $("#gridprocess").html(
              ' <font color="#FFFFFF"><strong>&nbsp; List of Leads => [Leads of Last 2 Days (' +
                ajaxresponse[3] +
                " Records)] </strong></font>"
            );
            //document.getElementById("gridprocess").innerHTML = ' => Filter Applied (' + ajaxresponse[3] +' Records)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a onclick="griddata();" style="cursor:pointer"><strong>Remove Filter</strong></a>]';
          } else if (ajaxresponse[0] == "2") {
            $("#resultgrid").html($("#tabgroupgridc1_1").html());
            $("#tabgroupgridc1_1").html(
              $("#resultgrid")
                .html()
                .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
            );
            $("#getmorelink").html(ajaxresponse[2]);
            $("#gridprocess").html(
              ' <font color="#FFFFFF"><strong>&nbsp; List of Leads => [Leads of Last 2 Days (' +
                ajaxresponse[3] +
                " Records)]</strong></font>"
            );
            //document.getElementById("gridprocess").innerHTML = ' => Filter Applied (' + ajaxresponse[3] +' Records)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a onclick="griddata();" style="cursor:pointer"><strong>Remove Filter</strong></a>]';
          } else {
            $("#gridprocess").html(scripterror1());
          }
        }
      },
      error: function (a, b) {
        $("#gridprocess").html(scripterror1());
      },
    });
  } else if (type == "filter") {
    $("#gridprocessf").html(
      processing() +
        "  " +
        '<span onclick = "abortajaxprocess(\'showmore\')" class="abort">(STOP)</span>'
    );
    var passdata =
      "&submittype=filter&startlimit=" +
      startlimit +
      "&slnocount=" +
      slnocount +
      "&showtype=" +
      showtype +
      "&fromdate=" +
      encodeURIComponent($("#hiddenfromdate").val()) +
      "&todate=" +
      encodeURIComponent($("#hiddentodate").val()) +
      "&dealerid=" +
      encodeURIComponent($("#hiddendealerid").val()) +
      "&givenby=" +
      encodeURIComponent($("#hiddengivenby1").val()) +
      "&productid=" +
      encodeURIComponent($("#hiddenproductid").val()) +
      "&leadstatus=" +
      encodeURIComponent($("#hiddenleadstatus").val()) +
      "&leadsubstatus=" +
      encodeURIComponent($("#hiddenleadsubstatus").val()) +
      "&filter_followupdate1=" +
      encodeURIComponent($("#filter_followupdate1hdn").val()) +
      "&filter_followupdate2=" +
      encodeURIComponent($("#filter_followupdate2hdn").val()) +
      "&dropterminatedstatus=" +
      encodeURIComponent(dropterminatedstatus) +
      "&searchtext=" +
      encodeURIComponent($("#srchhiddenfield").val()) +
      "&subselection=" +
      encodeURIComponent($("#subselhiddenfield").val()) +
      "&datatype=" +
      encodeURIComponent($("#datatypehiddenfield").val()) +
      "&followedby=" +
      encodeURIComponent($("#followedbyhidden").val()) +
      "&leadsource=" +
      encodeURIComponent($("#hiddensource").val()) +
      "&grouplabel=" +
      encodeURIComponent($("#hiddengrouplabel").val()) +
      "&followupcheck=" +
      followupcheck +
      "&remarks=" +
      remarks.val() +
      "&dummy=" +
      Math.floor(Math.random() * 10230000000);

    var queryString = "../ajax/simplelead.php"; //alert(passdata);
    ajaxobjext58 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse = response.split("|^|"); //alert(ajaxresponse);
          $("#gridprocessf").html("");
          if (ajaxresponse[0] == "1") {
            $("#resultgridf1").html($("#tabgroupgridf1_1").html());
            $("#tabgroupgridf1_1").html(
              $("#resultgridf1")
                .html()
                .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
            );
            $("#getmorelinkf1").html(ajaxresponse[2]);
            $("#gridprocessf").html(
              '<font color="#FFFFFF">=> Filter Applied (' +
                ajaxresponse[3] +
                " Records)</font>"
            );
          } else if (ajaxresponse[0] == "2") {
            $("#resultgridf1").html($("#tabgroupgridf1_1").html());
            $("#tabgroupgridf1_1").html(
              $("#resultgridf1")
                .html()
                .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
            );
            $("#getmorelinkf1").html(ajaxresponse[2]);
            $("#gridprocessf").html(
              '<font color="#FFFFFF"> => Filter Applied (' +
                ajaxresponse[3] +
                " Records)</font>"
            );
          } else {
            $("#gridprocessf").html(scripterror1());
          }
        }
      },
      error: function (a, b) {
        $("#gridprocessf").html(scripterror1());
      },
    });
  }
}

function send_quote() {
  var contactperson = $("#contactperson").val();
  var address = $("#address").val();
  var stdcode = $("#stdcode").val();
  var phone = $("#phone").val();
  var cell = $("#cell").val();
  var emailid = $("#emailid").val();
  var gstin = $("#gstin").val();
  var remarks = $("#remarks").val();
  var products = [];

  $("input[name='productName[]']").each(function (index) {
    var productName = $(this).val();
    var purchaseType = $("select[name='purchaseType[]']").eq(index).val();
    var usageType = $("select[name='usageType[]']").eq(index).val();
    var amount = $("input[name='amount[]']").eq(index).val();

    products.push({
      productName: productName,
      purchaseType: purchaseType,
      usageType: usageType,
      amount: amount,
    });
  });

  var id = $("#hiddenid").val();

  var passdata =
    "id=" +
    encodeURIComponent(id) +
    "&contactperson=" +
    encodeURIComponent(contactperson) +
    "&address=" +
    encodeURIComponent(address) +
    "&stdcode=" +
    encodeURIComponent(stdcode) +
    "&phone=" +
    encodeURIComponent(phone) +
    "&cell=" +
    encodeURIComponent(cell) +
    "&emailid=" +
    encodeURIComponent(emailid) +
    "&gstin=" +
    encodeURIComponent(gstin) +
    "&remarks=" +
    encodeURIComponent(remarks) +
    "&products=" +
    JSON.stringify(products) +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000);

  var queryString = "../mailinvoice/send_quote.php";

  ajaxobjext59 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      }
    },
  });
}

// function send_quote() {
//   var contactperson = $("#contactperson").val();
//   var address = $("#address").val();
//   var stdcode = $("#stdcode").val();
//   var phone = $("#phone").val();
//   var cell = $("#cell").val();
//   var emailid = $("#emailid").val();
//   var gstin = $("#gstin").val();
//   var productNames = [];
//   var purchaseTypes = [];
//   var usageTypes = [];
//   var amounts = [];
//   var remarks = $("#remarks").val();

//   $("input[name='productName[]']").each(function () {
//     productNames.push($(this).val());
//   });

//   $("select[name='purchaseType[]']").each(function () {
//     purchaseTypes.push($(this).val());
//   });

//   $("select[name='usageType[]']").each(function () {
//     usageTypes.push($(this).val());
//   });

//   $("input[name='amount[]']").each(function () {
//     amounts.push($(this).val());
//   });

//   var id = $("#hiddenid").val();

//   var passdata =
//     // "submittype=send_quote" +
//     "&id=" +
//     encodeURIComponent(id) +
//     "&contactperson=" +
//     contactperson +
//     "&address=" +
//     address +
//     "&stdcode=" +
//     stdcode +
//     "&phone=" +
//     phone +
//     "&cell=" +
//     cell +
//     "&emailid=" +
//     emailid +
//     "&gstin=" +
//     gstin +
//     "&productNames=" +
//     productNames.join(",") +
//     "&purchaseTypes=" +
//     purchaseTypes.join(",") +
//     "&usageTypes=" +
//     usageTypes.join(",") +
//     "&amounts=" +
//     amounts.join(",") +
//     "&remarks=" +
//     remarks +
//     "&dummy=" +
//     Math.floor(Math.random() * 10230000000);
// alert(passdata);
//   var queryString = "../mailinvoice/send_quote.php";
//   // var queryString = "../testphpmailer.php";
//   ajaxobjext59 = $.ajax({
//     type: "POST",
//     url: queryString,
//     data: passdata,
//     cache: false,
//     success: function (response, status) {
//       if (response == "Thinking to redirect") {
//         window.location = "../logout.php";
//         return false;
//       }
//     },
//   });
// }


function quote_generate() {
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var gstin = $("#gstin");
  var productNames = [];
  var purchaseTypes = [];
  var usageTypes = [];
  var amounts = [];
  var remarks = $("#remarks");
  var error = $("#messagebox2");
  var confirmcheck = $("#saveconfirm");

  var gstinRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/;

  if (gstin.val() == "") {
    error.html(errormessage("Please enter GSTIN."));
    gstin.focus();
    return false;
  } else if (!gstinRegex.test(gstin.val())) {
    error.html(errormessage("Invalid GSTIN."));
    gstin.focus();
    return false;
  }

  $("input[name='productName[]']").each(function (index) {
    var productName = $(this).val();
    var purchaseType = $("select[name='purchaseType[]']").eq(index).val();
    var usageType = $("select[name='usageType[]']").eq(index).val();
    var amount = $("input[name='amount[]']").eq(index).val();

    productNames.push(productName);
    purchaseTypes.push(purchaseType);
    usageTypes.push(usageType);
    amounts.push(amount);
  });

  if (productNames.length === 0) {
    error.html(errormessage("Please enter at least one product."));
    return false;
  }

  if (remarks.val() == "") {
    error.html(errormessage("Please enter Remarks."));
    remarks.focus();
    return false;
  }

  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == "" &&
    $("#id").html() == ""
  ) {
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else {
    error.html("");
    if (stdcode.val() == "") {
      error.html(errormessage("Please Enter Std code"));
      $("#stdcode").focus();
      return false;
    } else if (validatestdcode(stdcode.val()) == false) {
      error.html(errormessage("Please Enter Valid Std code"));
      $("#stdcode").focus();
      return false;
    } else if (phone.val() == "") {
      error.html(errormessage("Please Enter Landline Number"));
      $("#phone").focus();
      return false;
    } else if (validatephone(phone.val()) == false) {
      error.html(errormessage("Please Enter Valid Phone Number."));
      $("#phone").focus();
      return false;
    } else if (cell.val() == "") {
      error.html(errormessage("Please Enter Cell Number"));
      $("#cell").focus();
      return false;
    } else if (!validatecell(cell.val())) {
      error.html(errormessage("Please Enter Valid cell Number."));
      $("#cell").focus();
      return false;
    } else if (emailid.val() == "") {
      error.html(errormessage("Please Enter Emailid."));
      $("#emailid").focus();
      return false;
    } else if (checkemail(emailid.val()) == false) {
      error.html(errormessage("Please Enter a Valid Emailid."));
      $("#emailid").focus();
      return false;
    } else if (confirmcheck.is(":checked") == false) {
      error.html(
        errormessage("Please Confirm the Check Box to send quotation.")
      );
      return false;
    } else {
      error.html("");
      $("#messagebox2").html(processing());
      $("#msg_box").html("");
      var id = $("#hiddenid").val();

      var passdata =
        "submittype=quote_generate" +
        "&id=" +
        encodeURIComponent(id) +
        "&contactperson=" +
        contactperson.val() +
        "&address=" +
        address.val() +
        "&stdcode=" +
        stdcode.val() +
        "&phone=" +
        phone.val() +
        "&cell=" +
        cell.val() +
        "&emailid=" +
        emailid.val() +
        "&gstin=" +
        gstin.val() +
        "&productnames=" +
        productNames.join(",") +
        "&purchasetypes=" +
        purchaseTypes.join(",") +
        "&usagetypes=" +
        usageTypes.join(",") +
        "&amounts=" +
        amounts.join(",") +
        "&remarks=" +
        remarks.val() +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000);

      // alert(passdata);
      var queryString = "../ajax/simplelead.php";
      ajaxobjext59 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response == "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            $("#messagebox2").html("");
            var ajaxresponse = response.split("^");
            if (ajaxresponse[0] == "1") {
              $("#messagebox2").html(successmessage(ajaxresponse[1]));
              $("#smscell").html(cell.val());
              $("#newleadcell").val(cell.val());
              $("#hiddennewleadcell").val(cell.val());
              $("#newleademailid").val(emailid.val());
              $("#hiddennewleademailid").val(emailid.val());
              $("#newleadcontactperson").val(contactperson.val());
              $("#hiddennewleadcontact").val(contactperson.val());
              $("#prior-sms-error").html("");
              confirmcheck.attr("checked", false);
            } else {
              $("#messagebox2").html(scripterror());
            }
          }
        },
        error: function (a, b) {
          $("#messagebox2").html(scripterror());
        },
      });
    }
  }
}

// function quote_generate() {
//   var contactperson = $("#contactperson");
//   var address = $("#address");
//   var stdcode = $("#stdcode");
//   var phone = $("#phone");
//   var cell = $("#cell");
//   var emailid = $("#emailid");
//   var gstin = $("#gstin");
//   var productNames = []; // Array to store product names
//   var purchaseTypes = []; // Array to store purchase types
//   var usageTypes = []; // Array to store usage types
//   var amounts = []; // Array to store amounts
//   var remarks = $("#remarks");
//   var error = $("#messagebox2");
//   var confirmcheck = $("#saveconfirm");

//   // GSTIN validation regex
//   var gstinRegex =
//     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/;

//   if (gstin.val() == "") {
//     error.html(errormessage("Please enter GSTIN."));
//     gstin.focus();
//     return false;
//   } else if (!gstinRegex.test(gstin.val())) {
//     error.html(errormessage("Invalid GSTIN."));
//     gstin.focus();
//     return false;
//   }

//   // Iterate over each row of products
//   $("input[name='productName[]']").each(function (index) {
//     var productName = $(this).val();
//     var purchaseType = $("select[name='purchasetype[]']").eq(index).val();
//     var usageType = $("select[name='usagetype[]']").eq(index).val();
//     var amount = $("input[name='amount[]']").eq(index).val();

//     // Push the product data to the respective arrays
//     productNames.push(productName);
//     purchaseTypes.push(purchaseType);
//     usageTypes.push(usageType);
//     amounts.push(amount);
//   });

//   // Check if any product fields are empty
//   if (productNames.length === 0) {
//     error.html(errormessage("Please enter at least one product."));
//     return false;
//   }

//   // Check if Remarks is empty
//   if (remarks.val() == "") {
//     error.html(errormessage("Please enter Remarks."));
//     remarks.focus();
//     return false;
//   }

//   // Check if other fields are empty
//   if (
//     contactperson.val() == "" &&
//     address.val() == "" &&
//     stdcode.val() == "" &&
//     phone.val() == "" &&
//     cell.val() == "" &&
//     emailid.val() == "" &&
//     $("#id").html() == ""
//   ) {
//     error.html(errormessage("Please Select a Lead First"));
//     return false;
//   } else {
//     error.html("");
//     if (stdcode.val() == "") {
//       error.html(errormessage("Please Enter Std code"));
//       $("#stdcode").focus();
//       return false;
//     } else if (validatestdcode(stdcode.val()) == false) {
//       error.html(errormessage("Please Enter Valid Std code"));
//       $("#stdcode").focus();
//       return false;
//     } else if (phone.val() == "") {
//       error.html(errormessage("Please Enter Landline Number"));
//       $("#phone").focus();
//       return false;
//     } else if (validatephone(phone.val()) == false) {
//       error.html(errormessage("Please Enter Valid Phone Number."));
//       $("#phone").focus();
//       return false;
//     } else if (cell.val() == "") {
//       error.html(errormessage("Please Enter Cell Number"));
//       $("#cell").focus();
//       return false;
//     } else if (!validatecell(cell.val())) {
//       error.html(errormessage("Please Enter Valid cell Number."));
//       $("#cell").focus();
//       return false;
//     } else if (emailid.val() == "") {
//       error.html(errormessage("Please Enter Emailid."));
//       $("#emailid").focus();
//       return false;
//     } else if (checkemail(emailid.val()) == false) {
//       error.html(errormessage("Please Enter a Valid Emailid."));
//       $("#emailid").focus();
//       return false;
//     } else if (confirmcheck.is(":checked") == false) {
//       error.html(
//         errormessage("Please Confirm the Check Box to send quotation.")
//       );
//       return false;
//     } else {
//       error.html("");
//       $("#messagebox2").html(processing());
//       $("#msg_box").html("");
//       var id = $("#hiddenid").val();

//       var passdata =
//         "submittype=quote_generate" +
//         "&id=" +
//         encodeURIComponent(id) +
//         "&contactperson=" +
//         contactperson.val() +
//         "&address=" +
//         address.val() +
//         "&stdcode=" +
//         stdcode.val() +
//         "&phone=" +
//         phone.val() +
//         "&cell=" +
//         cell.val() +
//         "&emailid=" +
//         emailid.val() +
//         "&gstin=" +
//         gstin.val() +
//         "&productnames=" + joinWithCommas(productNames) +
//         "&purchasetypes=" + joinWithCommas(purchaseTypes) +
//         "&usagetypes=" + joinWithCommas(usageTypes) +
//         "&amounts=" + joinWithCommas(amounts) +
//         "&remarks=" +
//         remarks.val() +
//         "&dummy=" +
//         Math.floor(Math.random() * 10230000000);

//       var queryString = "../ajax/simplelead.php";
//       ajaxobjext59 = $.ajax({
//         type: "POST",
//         url: queryString,
//         data: passdata,
//         cache: false,
//         success: function (response, status) {
//           if (response == "Thinking to redirect") {
//             window.location = "../logout.php";
//             return false;
//           } else {
//             $("#messagebox2").html("");
//             var ajaxresponse = response.split("^");
//             if (ajaxresponse[0] == "1") {
//               $("#messagebox2").html(successmessage(ajaxresponse[1]));
//               $("#smscell").html(cell.val());
//               $("#newleadcell").val(cell.val());
//               $("#hiddennewleadcell").val(cell.val());
//               $("#newleademailid").val(emailid.val());
//               $("#hiddennewleademailid").val(emailid.val());
//               $("#newleadcontactperson").val(contactperson.val());
//               $("#hiddennewleadcontact").val(contactperson.val());
//               $("#prior-sms-error").html("");
//               confirmcheck.attr("checked", false);
//             } else {
//               $("#messagebox2").html(scripterror());
//             }
//           }
//         },
//         error: function (a, b) {
//           $("#messagebox2").html(scripterror());
//         },
//       });
//     }
//   }
// }

// // Function to join array elements with commas
// function joinWithCommas(arr) {
//   return arr.join(",");
// }

// function quote_generate() {
//   var contactperson = $("#contactperson");
//   var address = $("#address");
//   var stdcode = $("#stdcode");
//   var phone = $("#phone");
//   var cell = $("#cell");
//   var emailid = $("#emailid");
//   var gstin = $("#gstin");
//   var productNames = []; // Array to store product names
//   var purchaseTypes = []; // Array to store purchase types
//   var usageTypes = []; // Array to store usage types
//   var amounts = []; // Array to store amounts
//   var remarks = $("#remarks");
//   var error = $("#messagebox2");
//   var confirmcheck = $("#saveconfirm");

//   // GSTIN validation regex
//   var gstinRegex =
//     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/;

//   if (gstin.val() == "") {
//     error.html(errormessage("Please enter GSTIN."));
//     gstin.focus();
//     return false;
//   } else if (!gstinRegex.test(gstin.val())) {
//     error.html(errormessage("Invalid GSTIN."));
//     gstin.focus();
//     return false;
//   }

//   // Iterate over each row of products
//   $("input[name='product_name[]']").each(function (index) {
//     var productName = $(this).val();
//     var purchaseType = $("select[name='purchase_type[]']").eq(index).val();
//     var usageType = $("select[name='usage_type[]']").eq(index).val();
//     var amount = $("input[name='amount[]']").eq(index).val();

//     // Push the product data to the respective arrays
//     productNames.push(productName);
//     purchaseTypes.push(purchaseType);
//     usageTypes.push(usageType);
//     amounts.push(amount);
//   });

//   // Check if any product fields are empty
//   if (productNames.length === 0) {
//     error.html(errormessage("Please enter at least one product."));
//     return false;
//   }

//   // Check if Remarks is empty
//   if (remarks.val() == "") {
//     error.html(errormessage("Please enter Remarks."));
//     remarks.focus();
//     return false;
//   }

//   // Check if other fields are empty
//   if (
//     contactperson.val() == "" &&
//     address.val() == "" &&
//     stdcode.val() == "" &&
//     phone.val() == "" &&
//     cell.val() == "" &&
//     emailid.val() == "" &&
//     $("#id").html() == ""
//   ) {
//     error.html(errormessage("Please Select a Lead First"));
//     return false;
//   } else {
//     error.html("");
//     if (stdcode.val() == "") {
//       error.html(errormessage("Please Enter Std code"));
//       $("#stdcode").focus();
//       return false;
//     } else if (validatestdcode(stdcode.val()) == false) {
//       error.html(errormessage("Please Enter Valid Std code"));
//       $("#stdcode").focus();
//       return false;
//     } else if (phone.val() == "") {
//       error.html(errormessage("Please Enter Landline Number"));
//       $("#phone").focus();
//       return false;
//     } else if (validatephone(phone.val()) == false) {
//       error.html(errormessage("Please Enter Valid Phone Number."));
//       $("#phone").focus();
//       return false;
//     } else if (cell.val() == "") {
//       error.html(errormessage("Please Enter Cell Number"));
//       $("#cell").focus();
//       return false;
//     } else if (!validatecell(cell.val())) {
//       error.html(errormessage("Please Enter Valid cell Number."));
//       $("#cell").focus();
//       return false;
//     } else if (emailid.val() == "") {
//       error.html(errormessage("Please Enter Emailid."));
//       $("#emailid").focus();
//       return false;
//     } else if (checkemail(emailid.val()) == false) {
//       error.html(errormessage("Please Enter a Valid Emailid."));
//       $("#emailid").focus();
//       return false;
//     } else if (confirmcheck.is(":checked") == false) {
//       error.html(
//         errormessage("Please Confirm the Check Box to send quotation.")
//       );
//       return false;
//     } else {
//       error.html("");
//       $("#messagebox2").html(processing());
//       $("#msg_box").html("");
//       var id = $("#hiddenid").val();

//       var passdata =
//         "submittype=quote_generate" +
//         "&id=" +
//         encodeURIComponent(id) +
//         "&contactperson=" +
//         contactperson.val() +
//         "&address=" +
//         address.val() +
//         "&stdcode=" +
//         stdcode.val() +
//         "&phone=" +
//         phone.val() +
//         "&cell=" +
//         cell.val() +
//         "&emailid=" +
//         emailid.val() +
//         "&gstin=" +
//         gstin.val() +
//         "&product_names=" +
//         productNames.join(",") + // Separate product names by commas
//         "&purchase_types=" +
//         purchaseTypes.join(",") + // Separate purchase types by commas
//         "&usage_types=" +
//         usageTypes.join(",") + // Separate usage types by commas
//         "&amounts=" +
//         amounts.join(",") + // Separate amounts by commas
//         "&remarks=" +
//         remarks.val() +
//         "&dummy=" +
//         Math.floor(Math.random() * 10230000000);

//       var queryString = "../ajax/simplelead.php";
//       ajaxobjext59 = $.ajax({
//         type: "POST",
//         url: queryString,
//         data: passdata,
//         cache: false,
//         success: function (response, status) {
//           if (response == "Thinking to redirect") {
//             window.location = "../logout.php";
//             return false;
//           } else {
//             $("#messagebox2").html("");
//             var ajaxresponse = response.split("^");
//             if (ajaxresponse[0] == "1") {
//               $("#messagebox2").html(successmessage(ajaxresponse[1]));
//               $("#smscell").html(cell.val());
//               $("#newleadcell").val(cell.val());
//               $("#hiddennewleadcell").val(cell.val());
//               $("#newleademailid").val(emailid.val());
//               $("#hiddennewleademailid").val(emailid.val());
//               $("#newleadcontactperson").val(contactperson.val());
//               $("#hiddennewleadcontact").val(contactperson.val());
//               $("#prior-sms-error").html("");
//               confirmcheck.attr("checked", false);
//             } else {
//               $("#messagebox2").html(scripterror());
//             }
//           }
//         },
//         error: function (a, b) {
//           $("#messagebox2").html(scripterror());
//         },
//       });
//     }
//   }
// }

function gstin(gstin) {
  // GSTIN regular expression pattern
  var gstinPattern =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z0-9A-Z]{1}[0-9A-Z]{1}$/;

  // Check if the provided GSTIN matches the pattern
  if (gstinPattern.test(gstin)) {
    // Extract individual components
    var stateCode = gstin.substring(0, 2);
    var pan = gstin.substring(2, 12);
    var numRegistrations = gstin.charAt(12);
    var defaultChar = gstin.charAt(13);
    var checksumDigit = gstin.charAt(14);

    // Validate state code (you may customize this validation based on your requirements)
    if (isValidStateCode(stateCode)) {
      // Validate PAN (you may customize this validation based on your requirements)
      if (isValidPAN(pan)) {
        // Validate number of registrations
        if (numRegistrations !== "0") {
          // Validate default character
          if (defaultChar === "Z") {
            // Validate checksum digit
            if (isValidChecksum(gstin)) {
              return true; // GSTIN is valid
            } else {
              return "Invalid checksum digit";
            }
          } else {
            return "Invalid default character";
          }
        } else {
          return "Number of registrations cannot be 0";
        }
      } else {
        return "Invalid PAN";
      }
    } else {
      return "Invalid state code";
    }
  } else {
    return "Invalid GSTIN format";
  }
}

function product() {
  var gstin = $("#gstin");
  var product = $("#Product");
  var purchaseType = $("#purchase");
  var usageType = $("#usage");
  var amount = $("#amount");
  var remarks = $("#remarks");

  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var error = $("#messagebox1");
  var confirmcheck = $("#saveconfirm");

  if (
    contactperson.val() === "" &&
    address.val() === "" &&
    stdcode.val() === "" &&
    phone.val() === "" &&
    cell.val() === "" &&
    emailid.val() === "" &&
    $("#id").html() === ""
  ) {
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else {
    error.html("");
    if (stdcode.val() === "") {
      error.html(errormessage("Please Enter Std code"));
      $("#stdcode").focus();
      return false;
    } else if (!validatestdcode(stdcode.val())) {
      error.html(errormessage("Please Enter Valid Std code"));
      $("#stdcode").focus();
      return false;
    } else if (phone.val() === "") {
      error.html(errormessage("Please Enter Landline Number"));
      $("#phone").focus();
      return false;
    } else if (!validatephone(phone.val())) {
      error.html(errormessage("Please Enter Valid Phone Number."));
      $("#phone").focus();
      return false;
    } else if (cell.val() === "") {
      error.html(errormessage("Please Enter Cell Number"));
      $("#cell").focus();
      return false;
    } else if (!validatecell(cell.val())) {
      error.html(errormessage("Please Enter Valid Cell Number."));
      $("#cell").focus();
      return false;
    } else if (emailid.val() === "") {
      error.html(errormessage("Please Enter Emailid."));
      $("#emailid").focus();
      return false;
    } else if (!checkemail(emailid.val())) {
      error.html(errormessage("Please Enter a Valid Emailid."));
      $("#emailid").focus();
      return false;
    } else if (!confirmcheck.prop("checked")) {
      error.html(errormessage("Please Confirm the Check Box to Save."));
      return false;
    } else {
      $("#messagebox1").html(processing());
      $("#msg_box").html("");
      var id = $("#hiddenid").val();
      var passdata =
        "&submittype=updatedata&id=" +
        encodeURIComponent(id) +
        "&contactperson=" +
        encodeURIComponent(contactperson.val()) +
        "&address=" +
        encodeURIComponent(address.val()) +
        "&stdcode=" +
        encodeURIComponent(stdcode.val()) +
        "&phone=" +
        encodeURIComponent(phone.val()) +
        "&cell=" +
        encodeURIComponent(cell.val()) +
        "&emailid=" +
        encodeURIComponent(emailid.val()) +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000);
      var queryString = "../ajax/simplelead.php";
      ajaxobjext59 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response === "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            $("#messagebox1").html("");
            var ajaxresponse = response.split("^");
            if (ajaxresponse[0] === "1") {
              $("#messagebox1").html(successmessage(ajaxresponse[1]));
              $("#smscell").html(cell.val());
              $("#newleadcell").val(cell.val());
              $("#hiddennewleadcell").val(cell.val());
              $("#newleademailid").val(emailid.val());
              $("#hiddennewleademailid").val(emailid.val());
              $("#newleadcontactperson").val(contactperson.val());
              $("#hiddennewleadcontact").val(contactperson.val());
              $("#prior-sms-error").html("");
              confirmcheck.prop("checked", false);
            } else {
              $("#messagebox1").html(scripterror());
            }
          }
        },
        error: function (a, b) {
          $("#messagebox1").html(scripterror());
        },
      });
    }
  }
}

function updatedata() {
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var error = $("#messagebox1");
  var confirmcheck = $("#saveconfirm"); //alert(document.getElementById('saveconfirm').checked);

  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == "" &&
    $("#id").html() == ""
  ) {
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else {
    error.html("");
    if (stdcode.val() == "") {
      error.html(errormessage("Please Enter Std code"));
      $("#stdcode").focus();
      return false;
    } else if (validatestdcode(stdcode.val()) == false) {
      error.html(errormessage("Please Enter Valid Std code"));
      $("#stdcode").focus();
      return false;
    } else if (phone.val() == "") {
      error.html(errormessage("Please Enter Landline Number"));
      $("#phone").focus();
      return false;
    } else if (validatephone(phone.val()) == false) {
      error.html(errormessage("Please Enter Valid Phone Number."));
      $("#phone").focus();
      return false;
    } else if (cell.val() == "") {
      error.html(errormessage("Please Enter Cell Number"));
      $("#cell").focus();
      return false;
    } else if (!validatecell(cell.val())) {
      error.html(errormessage("Please Enter Valid cell Number."));
      $("#cell").focus();
      return false;
    } else if (emailid.val() == "") {
      error.html(errormessage("Please Enter Emailid."));
      $("#emailid").focus();
      return false;
    } else if (checkemail(emailid.val()) == false) {
      error.html(errormessage("Please Enter a Valid Emailid."));
      $("#emailid").focus();
      return false;
    } else if (confirmcheck.is(":checked") == false) {
      /*else if(todealerid.value =='')
		{
			error.innerHTML = errormessage("Please Select Dealer.");
			return false;
		}*/
      error.html(errormessage("Please Confirm the Check Box to Save."));
      return false;
    } else {
      $("#messagebox1").html(processing());

      $("#msg_box").html("");
      var id = $("#hiddenid").val();
      var passdata =
        "&submittype=updatedata&id=" +
        encodeURIComponent(id) +
        "&contactperson=" +
        contactperson.val() +
        "&address=" +
        address.val() +
        "&stdcode=" +
        stdcode.val() +
        "&phone=" +
        phone.val() +
        "&cell=" +
        cell.val() +
        "&emailid=" +
        emailid.val() +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000); //alert(passdata);
      var queryString = "../ajax/simplelead.php";
      ajaxobjext59 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response == "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            $("#messagebox1").html("");
            var ajaxresponse = response.split("^"); //alert(ajaxresponse);
            if (ajaxresponse[0] == "1") {
              $("#messagebox1").html(successmessage(ajaxresponse[1]));
              $("#smscell").html(cell.val());
              $("#newleadcell").val(cell.val());
              $("#hiddennewleadcell").val(cell.val());
              $("#newleademailid").val(emailid.val());
              $("#hiddennewleademailid").val(emailid.val());
              $("#newleadcontactperson").val(contactperson.val());
              $("#hiddennewleadcontact").val(contactperson.val());
              $("#prior-sms-error").html("");
              confirmcheck.attr("checked", false);
            } else {
              $("#messagebox1").html(scripterror());
            }
          }
        },
        error: function (a, b) {
          $("#messagebox1").html(scripterror());
        },
      });
    }
  }
}

function resetform() {
  $("#messagebox1").html(processing());
  var id = $("#hiddenid").val();
  $("saveconfirm").attr("checked", false);
  //gridtoform(id);
  $("#messagebox1").html("");
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var error = $("#messagebox1");
  var confirmcheck = $("#saveconfirm"); //alert(document.getElementById('saveconfirm').checked);
  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == ""
  ) {
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else {
    $("#id").html($("#hiddencompany").val());
    $("#contactperson").val($("#hiddencontact").val());
    $("#address").val($("#hiddenaddress").val());
    $("#district").html($("#hiddendistrictstate").val());
    $("#stdcode").val($("#hiddenstdcode").val());
    $("#phone").val($("#hiddenphone").val());
    $("#cell").val($("#hiddencell").val());
    $("#emailid").val($("#hiddenemailid").val());
    $("#referencetype").html($("#hiddenreference").val());
    $("#givenby1").html($("#hiddengivenby").val());
    $("#dateoflead").html($("#hiddendateoflead").val());
    $("#dealerviewdate").html($("#hiddendealerviewdate").val());
    $("#product1").html($("#hiddenproduct").val());
    $("#dealer1").html($("#hiddendealer").val());
    $("#manager").html($("#hiddenmanager").val());
  }
}

function gridtab5(activetab, groupname, activetype) {
  var totaltabs = 5;
  var activetabclass = "grid-active-tabclass";
  var tabheadclass = "grid-tabclass";
  for (var i = 1; i <= totaltabs; i++) {
    var tabhead = groupname + "h" + i;
    var tabcontent = groupname + "c" + i;
    if (i == activetab) {
      $("#" + tabhead).attr("class", activetabclass);
      $("#" + tabcontent).show();
      $("#hiddenactivetype").val(activetype);
      if (activetype == "updatelogs") {
        tabgridcontent("updatelogs", tabcontent);
      } else if (activetype == "transferlogs") {
        tabgridcontent("transferlogs", tabcontent);
      } else if (activetype == "followup") {
        tabgridcontent("followup", tabcontent);
      } else if (activetype == "viewotherleads") {
        viewotherleads("");
      } else if (activetype == "downloadlogs") {
        downloadlogs("");
      }
    } else {
      $("#" + tabhead).attr("class", tabheadclass);
      $("#" + tabcontent).hide();
    }
  }
}

function tabgridcontent(referencetablename, contentdiv) {
  var id = $("#hiddenid").val(); //alert(id);
  var queryString = "../ajax/simplelead.php";
  if (id != "") {
    if (referencetablename == "updatelogs") {
      $("#tabgroupgridc1_2").html(processing());
      var passdata =
        "&submittype=" +
        referencetablename +
        "&id=" +
        id +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000);
    } else if (referencetablename == "transferlogs") {
      $("#tabgroupgridc1_3").html(processing());
      var passdata =
        "&submittype=" +
        referencetablename +
        "&id=" +
        id +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000);
    } else if (referencetablename == "followup") {
      var passdata =
        "&submittype=showfollowups&form_recid=" +
        id +
        "&dummy=" +
        Math.floor(Math.random() * 100032680100);
    }
    ajaxobjext60 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse = response.split("^"); //alert(ajaxresponse);
          $("#tabgroupgridc1_2").html("");
          $("#tabgroupgridc1_3").html("");
          //document.getElementById('msg_box').innerHTML = '';
          if (ajaxresponse[0] == "1") {
            if (contentdiv == "tabgroupgridc2") {
              $("#tabgroupgridc1_2").html(ajaxresponse[1]);
              $("#getmorelink2").html(ajaxresponse[2]);
            } else if (contentdiv == "tabgroupgridc3") {
              $("#tabgroupgridc1_3").html(ajaxresponse[1]);
              $("#getmorelink3").html(ajaxresponse[2]);
            } else if (contentdiv == "tabgroupgridc1") {
              $("#smallgrid").html(ajaxresponse[1]);
              $("#followupmessage").html("");
            }
          } else if (ajaxresponse[0] == "2") {
            if (contentdiv == "tabgroupgridc2") {
              $("#tabgroupgridc1_2").html(ajaxresponse[1]);
              //document.getElementById("getmorelink2").innerHTML = ajaxresponse[2];
            } else if (contentdiv == "tabgroupgridc3") {
              //document.getElementById('contentdiv').innerHTML = ajaxresponse[1];
              $("#tabgroupgridc1_3").html(ajaxresponse[1]);
              //document.getElementById("getmorelink3").innerHTML = ajaxresponse[2];
            }
          } else {
            if (contentdiv == "tabgroupgridc2") {
              $("#tabgroupgridc1_2").html(scripterror());
            } else if (contentdiv == "tabgroupgridc3") {
              $("#tabgroupgridc1_3").html(scripterror());
            }
          }
        }
      },
      error: function (a, b) {
        if (contentdiv == "tabgroupgridc2") {
          $("#tabgroupgridc1_2").html(scripterror());
        } else if (contentdiv == "tabgroupgridc3") {
          $("#tabgroupgridc1_3").html(scripterror());
        }
      },
    });
  } else {
    $("#msg_box").html(errormessage("Please Select a Lead First"));
    return false;
  }
}

function getmorerecords2(startlimit, slnocount, showtype) {
  //document.getElementById("gridprocess").innerHTML = processing();
  var id = $("#hiddenid").val();
  var passdata =
    "&submittype=transferlogs&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&id=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext61 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          //document.getElementById("gridprocess").innerHTML = '';
          $("#resultgrid3").html($("#tabgroupgridc1_3").html());
          $("#tabgroupgridc1_3").html(
            $("#resultgrid3")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelink3").html(ajaxresponse[2]);
          //document.getElementById('totalcount').innerHTML = "Total Count :  " + ajaxresponse[3];
        } else {
          //document.getElementById("gridprocess").innerHTML = '';
          $("#getmorelink3").html(
            errormessage("No datas found to be displayed.")
          );
        }
      }
    },
    error: function (a, b) {
      $("#gridprocess").html("");
      $("#resultgrid3").html(scripterror());
    },
  });
}

function getmorerecords3(startlimit, slnocount, showtype) {
  //document.getElementById("gridprocess").innerHTML = processing();
  var id = $("#hiddenid").val();
  var passdata =
    "&submittype=updatelogs&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&id=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext62 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          //document.getElementById("gridprocess").innerHTML = '';
          $("#resultgrid2").html($("#tabgroupgridc1_2").html());
          $("#tabgroupgridc1_2").html(
            $("#resultgrid2")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelink2").html(ajaxresponse[2]);
          //document.getElementById('totalcount').innerHTML = "Total Count :  " + ajaxresponse[3];
        } else {
          //document.getElementById("gridprocess").innerHTML = '';
          $("#getmorelink2").html(
            errormessage("No datas found to be displayed.")
          );
        }
      }
    },
    error: function (a, b) {
      $("#resultgrid2").html(scripterror());
    },
  });
}

// Leads tabbed Grid Functions.

//filter to function

function leadgridtab5(activetab, groupname, activetype) {
  var totaltabs = 5;
  var activetabclass = "grid-active-leadtabclass";
  var tabheadclass = "grid-leadtabclass";
  for (var i = 1; i <= totaltabs; i++) {
    var tabhead = groupname + "h" + i;
    var tabcontent = groupname + "c" + i;
    if (i == activetab) {
      $("#" + tabhead).attr("class", activetabclass);
      $("#" + tabcontent).show();
      if (activetype == "default") {
        griddata("");
      } else if (activetype == "todayfollowup") {
        followupforday("");
      } else if (activetype == "nofollowup") {
        nofollowup("");
      } else if (activetype == "notviewed") {
        notviewed("");
      }
    } else {
      $("#" + tabhead).attr("class", tabheadclass);
      $("#" + tabcontent).hide();
    }
  }
}

// Function to display today's followup.

function followupforday(startlimit) {
  $("#followuptotal").html(
    processing() +
      "  " +
      '<span onclick = "abortfollowupajaxprocess(\'initial\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=followupforday&startlimit=" +
    startlimit +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext63 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("followuptotal").html("");
        if (ajaxresponse[0] == "1") {
          $("#tabgroupgridfup1_1").html(ajaxresponse[1]);
          $("#getmorelinkfup").html(ajaxresponse[2]);
          $("#followuptotal").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#followuptotal").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#tabgroupgridc1_1").html(scripterror1());
    },
  });
}

function getmorerecordsfollowup(startlimit, slnocount, showtype) {
  $("#followuptotal").html(
    processing() +
      "  " +
      '<span onclick = "abortfollowupajaxprocess(\'showmore\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=followupforday&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext64 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("#followuptotal").html("");
        if (ajaxresponse[0] == "1") {
          $("#resultgridfup").html($("#tabgroupgridfup1_1").html());
          $("#tabgroupgridfup1_1").html(
            $("#resultgridfup")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelinkfup").html(ajaxresponse[2]);
          $("#followuptotal").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#followuptotal").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#followuptotal").html(scripterror1());
    },
  });
}

// Function to display '0' followups.

function nofollowup(startlimit) {
  $("#followuptotaln").html(
    processing() +
      "  " +
      '<span onclick = "abortnofollowupajaxprocess(\'initial\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=nofollowup&startlimit=" +
    startlimit +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext65 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("#followuptotaln").html("");
        if (ajaxresponse[0] == "1") {
          $("#tabgroupgridn1_1").html(ajaxresponse[1]);
          $("#getmorelinkn1").html(ajaxresponse[2]);
          $("#followuptotaln").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#followuptotaln").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#followuptotaln").html(scripterror1());
    },
  });
}

function getmorerecordsnofollowup(startlimit, slnocount, showtype) {
  $("#followuptotaln").html(
    processing() +
      "  " +
      '<span onclick = "abortnofollowupajaxprocess(\'showmore\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=nofollowup&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext66 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("#followuptotaln").html("");
        if (ajaxresponse[0] == "1") {
          $("#resultgridn1").html($("#tabgroupgridn1_1").html());
          $("#tabgroupgridn1_1").html(
            $("#resultgridn1")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelinkn1").html(ajaxresponse[2]);
          $("#followuptotaln").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#followuptotaln").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#followuptotaln").html(scripterror1());
    },
  });
}

// Function to view not viewed leads.

function notviewed(startlimit) {
  $("#gridprocessnv").html(
    processing() +
      "  " +
      '<span onclick = "abortnotviewedajaxprocess(\'initial\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=notviewed&startlimit=" +
    startlimit +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php"; //alert(passdata);
  ajaxobjext67 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("#gridprocessnv").html("");
        if (ajaxresponse[0] == "1") {
          $("#tabgroupgridnv1_1").html(ajaxresponse[1]);
          $("#getmorelinknv1").html(ajaxresponse[2]);
          $("#gridprocessnv").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#gridprocessnv").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#gridprocessnv").html(scripterror1());
    },
  });
}

function getmorerecordsnotviewed(startlimit, slnocount, showtype) {
  $("#gridprocessnv").html(
    processing() +
      "  " +
      '<span onclick = "abortnotviewedajaxprocess(\'showmore\')" class="abort">(STOP)</span>'
  );
  var passdata =
    "&submittype=notviewed&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext68 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        $("#gridprocessnv").html("");
        if (ajaxresponse[0] == "1") {
          $("#resultgridnv1").html($("#tabgroupgridnv1_1").html());
          $("#tabgroupgridnv1_1").html(
            $("#resultgridnv1")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelinknv1").html(ajaxresponse[2]);
          $("#gridprocessnv").html(
            '<font color="#FFFFFF"><strong>&nbsp;Total Count :  ' +
              ajaxresponse[3] +
              "</strong></font>"
          );
        } else {
          $("#gridprocessnv").html(scripterror1());
        }
      }
    },
    error: function (a, b) {
      $("#gridprocessnv").html(scripterror1());
    },
  });
}

// Function to view other leads of same person.

function viewotherleads(startlimit) {
  if ($("#hiddenid").val() == "") {
    $("#msg_box").html(errormessage("Please Select a Lead First."));
  } else {
    $("#msg_box").html("");
    var id = $("#hiddenid").val();
    $("#tabgroupgridc1_4").html(processing());
    var passdata =
      "&submittype=otherleads&startlimit=" +
      startlimit +
      "&id=" +
      id +
      "&dummy=" +
      Math.floor(Math.random() * 10230000000);
    var queryString = "../ajax/simplelead.php"; //alert(passdata);
    ajaxobjext69 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse = response.split("^"); //alert(ajaxresponse);
          $("#getmorelink4").html("");
          if (ajaxresponse[0] == "1") {
            $("#tabgroupgridc1_4").html(ajaxresponse[1]);
            $("#getmorelink4").html(ajaxresponse[2]);
          } else {
            $("#tabgroupgridc1_4").html(scripterror());
          }
        }
      },
      error: function (a, b) {
        $("#tabgroupgridc1_4").html(scripterror());
      },
    });
  }
}

function getmoreofotherleads(startlimit, slnocount, showtype) {
  $("#getmorelink4").html(processing());
  var id = $("#hiddenid").val();
  var passdata =
    "&submittype=otherleads&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&id=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext70 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        //document.getElementById('tabgroupgridc1_4').innerHTML = '';
        if (ajaxresponse[0] == "1") {
          $("#resultgrid4").html($("#tabgroupgridc1_4").html());
          $("#tabgroupgridc1_4").html(
            $("#resultgrid4")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelink4").html(ajaxresponse[2]);
        } else {
          $("#tabgroupgridc1_4").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#tabgroupgridc1_4").html(scripterror());
    },
  });
}

// Function to view downloadlogs

function downloadlogs(startlimit) {
  if ($("#hiddenid").val() == "") {
    $("#msg_box").html(errormessage("Please Select a Lead First."));
  } else {
    $("#msg_box").html("");
    var id = $("#hiddenid").val();
    $("#tabgroupgridc1_5").html(processing());
    var passdata =
      "&submittype=downloadlogs&startlimit=" +
      startlimit +
      "&id=" +
      id +
      "&dummy=" +
      Math.floor(Math.random() * 10230000000); //alert(passdata)
    var queryString = "../ajax/simplelead.php"; //alert(passdata);
    ajaxobjext71 = $.ajax({
      type: "POST",
      url: queryString,
      data: passdata,
      cache: false,
      success: function (response, status) {
        if (response == "Thinking to redirect") {
          window.location = "../logout.php";
          return false;
        } else {
          var ajaxresponse = response.split("^"); //alert(ajaxresponse);
          //document.getElementById('tabgroupgridc1_5').innerHTML  = '';
          if (ajaxresponse[0] == "1") {
            $("#tabgroupgridc1_5").html(ajaxresponse[1]);
            $("#getmorelink5").html(ajaxresponse[2]);
          } else {
            $("#tabgroupgridc1_5").html(scripterror());
          }
        }
      },
      error: function (a, b) {
        $("#tabgroupgridc1_5").html(scripterror());
      },
    });
  }
}

function getmoreofdownloadlogs(startlimit, slnocount, showtype) {
  $("#getmorelink5").html(processing());
  var id = $("#hiddenid").val();
  var passdata =
    "&submittype=downloadlogs&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&id=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext72 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          $("#resultgrid5").html($("#tabgroupgridc1_5").html());
          $("#tabgroupgridc1_5").html(
            $("#resultgrid5")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmorelink5").html(ajaxresponse[2]);
        } else {
          $("#getmorelink5").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#getmorelink5").html(scripterror());
    },
  });
}

function divopenclosefunction() {
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var error = $("#messagebox1");
  var confirmcheck = $("#saveconfirm"); //alert(document.getElementById('saveconfirm').checked);
  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == ""
  ) {
    $("#dealerlist1").val("");
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else {
    if (
      $("#hiddentype").val() == "Admin" ||
      $("#hiddentype").val() == "Sub Admin" ||
      $("#hiddentype").val() == "Reporting Authority"
    ) {
      $("#selectlist").show();
      $("#link").hide();
    } else if ($("#hiddentype").val() == "Dealer") {
      $("#selectlist1").show();
      $("#link1").hide();
    }
  }
}

function resetlink(type) {
  if (type == "open") {
    var error = $("#messagebox1");
    if (
      $("#hiddentype").val() == "Admin" ||
      $("#hiddentype").val() == "Sub Admin" ||
      $("#hiddentype").val() == "Reporting Authority"
    ) {
      var todealerid = $("#dealerlist1").val();
      if (todealerid == "") {
        error.html(errormessage("Please Select Dealer."));
        return false;
      } else {
        var selected_text = $("#dealerlist1 option:selected").text();
      }
    } else if ($("#hiddentype").val() == "Dealer") {
      var todealerid = $("#dealermemberlist").val(); //alert($('#dealermemberlist option').size())
      if ($("#dealermemberlist option").size() == "1") {
        error.html(errormessage("Sorry No Dealer Members Assigned."));
        return false;
      } else if (todealerid == "") {
        error.html(errormessage("Please Select Dealer Member."));
        return false;
      } else {
        var selected_text = $("#dealermemberlist option:selected").text();
      }
    }
    var val =
      "Are you sure you want to Transfer this Lead to " + selected_text + " ?";
    var confirmation = confirm(val);
    if (confirmation) {
      error.html(processing());
      if (
        $("#hiddentype").val() == "Admin" ||
        $("#hiddentype").val() == "Sub Admin" ||
        $("#hiddentype").val() == "Reporting Authority"
      ) {
        $("#selectlist").show();
        $("#link").hide();
      } else if ($("#hiddentype").val() == "Dealer") {
        $("#selectlist1").show();
        $("#link1").hide();
      }
      //var todealerid = document.getElementById('dealerlist1'); //alert(todealerid);
      var id = $("#hiddenid").val();
      var passdata =
        "&submittype=transferlead&id=" +
        encodeURIComponent(id) +
        "&todealerid=" +
        todealerid +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000); //alert(passdata)
      var queryString = "../ajax/simplelead.php";
      ajaxobjext73 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response == "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            $("#messagebox1").html("");
            var ajaxresponse = response.split("^"); //alert(ajaxresponse);
            if (ajaxresponse[0] == "1") {
              error.html(successmessage(ajaxresponse[1]));
              $("#selectlist").hide();
              $("#link").show();
              $("#dealer1").html(ajaxresponse[2]);
              $("#manager").html(ajaxresponse[3]);
              $("#hiddendealertext").val(ajaxresponse[4]); //alert( response3[28]);
              $("#hiddenmanagertext").val(ajaxresponse[5]);
              if (
                $("#hiddentype").val() == "Admin" ||
                $("#hiddentype").val() == "Sub Admin" ||
                $("#hiddentype").val() == "Reporting Authority"
              ) {
                $("#dealerlist1").val("");
              } else if ($("#hiddentype").val() == "Dealer") {
                $("#dealermemberlist").val("");
              }
            } else if (ajaxresponse[0] == "2") {
              error.html(successmessage(ajaxresponse[1]));
              $("#selectlist1").hide();
              $("#link1").show();
            } else if (ajaxresponse[0] == "3") {
              error.html(errormessage(ajaxresponse[1]));
            } else {
              $("#messagebox1").html(scripterror());
            }
          }
        },
        error: function (a, b) {
          $("#messagebox1").html(scripterror());
        },
      });
    } else return false;
  } else if (type == "close") {
    $("#messagebox1").html("");
    if (
      $("#hiddentype").val() == "Admin" ||
      $("#hiddentype").val() == "Sub Admin" ||
      $("#hiddentype").val() == "Reporting Authority"
    ) {
      $("#dealerlist1").val("");
      $("#selectlist").hide();
      $("#link").show();
    } else if ($("#hiddentype").val() == "Dealer") {
      $("#dealermemberlist").val("");
      $("#selectlist1").hide();
      $("#link1").show();
    }
  }
}
function newtog() {
  $("#divform").toggle();
}

function updatestatusstrip() {
  $("#leadstotal").html(processing());
  var queryString = "../ajax/simplelead.php";
  var passdata =
    "&submittype=statusstrip&dummy=" + Math.floor(Math.random() * 10230000000); //alert(passdata)
  ajaxobjext74 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); // alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          $("#leadstotal").html(ajaxresponse[1]);
          $("#noviewed").html(ajaxresponse[2]);
          $("#unattended").html(ajaxresponse[3]);
          $("#notinterested").html(ajaxresponse[4]);
          $("#fakeenquiry").html(ajaxresponse[5]);
          $("#registereduser").html(ajaxresponse[6]);
          $("#attended").html(ajaxresponse[7]);
          $("#persuingtopurchase").html(ajaxresponse[8]);
          $("#demogiven").html(ajaxresponse[9]);
          $("#quotesent").html(ajaxresponse[10]);
          $("#orderclosed").html(ajaxresponse[11]);
        } else {
          $("#leadstotal").html("");
          $("#messagebox1").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#leadstotal").html("");
      $("#messagebox1").html(scripterror());
    },
  });
}

function leadtrack(type) {
  if (type == "tracker") {
    $("#tracker").show();
    $("#changetheproduct").hide();
    $("#sendsms").hide();
  } else if (type == "productchange") {
    $("#errordisplay").html("");
    $("#leadremarks1").val("");
    $("#changetheproduct").show();
    $("#sendsms").hide();
    $("#tracker").hide();
    $("#productchangeselect").val("");
    /*if(document.getElementById('productchangeselect').value == '' && document.getElementById('form_recid').value != '')
		{
			gridtoform(document.getElementById('form_recid').value);
		}*/
  } else if (type == "sendsms") {
    //document.smsform.smstext.focus()
    getmynumber();
    $("#tracker").hide();
    $("#changetheproduct").hide();
    $("#sendsms").show();
    sendsms("reset");
    $("#prior-sms-error").html("");
    var cellnumber = $("#smscell");
    var leadcardcell = $("#cell");
    var contactperson = $("#contactperson");
    var address = $("#address");
    var stdcode = $("#stdcode");
    var phone = $("#phone");
    var cell = $("#cell");
    var emailid = $("#emailid");
    var newleadsource = $("#newleadsource");
    if (
      contactperson.val() == "" &&
      address.val() == "" &&
      stdcode.val() == "" &&
      phone.val() == "" &&
      cell.val() == "" &&
      emailid.val() == ""
    ) {
      $("#prior-sms-error").html(errormessage("Please Select a Lead First"));
      return false;
    } else if (cellnumber.html() == "" && leadcardcell.val() == "") {
      $("#prior-sms-error").html(
        errormessage("Please Save Cell Number and then proceed.")
      );
      leadcardcell.focus();
      return false;
    }
  }
}

// Function to create new Lead

function createlead() {
  var form = $("#productchangeform");
  var productid = $("#productchangeselect");
  var remarks = $("#leadremarks1"); //var subselection = $("input[name='databasefield']:checked").val();
  var radiovalue = $("input[name='dealerselection']:checked").val();
  var dealer = $("#changeproductdealerlist"); //alert(dealer)
  var leadid = $("#form_recid").val(); //alert(leadid);
  var error = $("#errordisplay");
  var contactname = $("#errordisplay");
  var newleadcontactperson = $("#newleadcontactperson");
  var newleadcell = $("#newleadcell");
  var newleademailid = $("#newleademailid");
  var contactperson = $("#contactperson");
  var address = $("#address");
  var stdcode = $("#stdcode");
  var phone = $("#phone");
  var cell = $("#cell");
  var emailid = $("#emailid");
  var newleadsource = $("#newleadsource");
  if (
    contactperson.val() == "" &&
    address.val() == "" &&
    stdcode.val() == "" &&
    phone.val() == "" &&
    cell.val() == "" &&
    emailid.val() == ""
  ) {
    error.html(errormessage("Please Select a Lead First"));
    return false;
  } else if (newleadcontactperson.val() == "") {
    error.html(errormessage("Please Enter Contact Name"));
    newleadcontactperson.focus();
    return false;
  } else if (newleadcell.val() == "") {
    error.html(errormessage("Please Enter Cell Number"));
    newleadcell.focus();
    return false;
  } else if (!validatecell(newleadcell.val())) {
    error.html(errormessage("Please Enter Valid cell Number."));
    newleadcell.focus();
    return false;
  } else if (newleademailid.val() == "") {
    error.html(errormessage("Please Enter Email Id."));
    newleademailid.focus();
    return false;
  } else if (checkemail(newleademailid.val()) == false) {
    error.html(errormessage("Please Enter a Valid Emailid."));
    newleademailid.focus();
    return false;
  } else if (productid.val() == "") {
    error.html(errormessage("Please select Product"));
    productid.focus();
    return false;
  } else if (radiovalue == "manualselection" && dealer.val() == "") {
    error.html(errormessage("Please select Dealer"));
    dealer.focus();
    return false;
  } else if (newleadsource.val() == "") {
    error.html(errormessage("Please select Reference"));
    newleadsource.focus();
    return false;
  }
  error.html(processing());
  var passdata =
    "&submittype=createlead&leadid=" +
    leadid +
    "&productid=" +
    productid.val() +
    "&remarks=" +
    remarks.val() +
    "&radiovalue=" +
    radiovalue +
    "&dealer=" +
    dealer.val() +
    "&newleadcontactperson=" +
    newleadcontactperson.val() +
    "&newleadcell=" +
    newleadcell.val() +
    "&newleademailid=" +
    newleademailid.val() +
    "&newleadsource=" +
    newleadsource.val() +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext75 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          error.html(successmessage(ajaxresponse[1]));
          $("#samedealer").attr("checked", true);
          $("#dealerlistdiv").hide();
        } else if (ajaxresponse[0] == "2") {
          error.html(errormessage(ajaxresponse[1]));
        } else {
          error.html(errormessage(ajaxresponse[1]));
        }
      }
    },
    error: function (a, b) {
      error.html(errormessage(ajaxresponse[1]));
    },
  });
}

function togdealerselect() {
  var form = $("#productchangeform");
  var radiovalue = $("input[name='dealerselection']:checked").val();
  $("#errordisplay").html("");
  $("sms-error").html("");
  if (radiovalue == "manualselection") {
    $("#changeproductdealerlist").val("");
    $("#dealerlistdiv").show();
  } else $("#dealerlistdiv").hide();
}

// Function to reset productchange form

function resetproductchange() {
  $("#productchangeselect").val("");
  $("#leadremarks1").val("");
  $("#samedealer").attr("checked", true);
  $("#changeproductdealerlist").val("");
  $("#errordisplay").html("");
  $("#newleadcompany").html($("#hiddennewleadcompany").val());
  $("#newleadcontactperson").val($("#hiddennewleadcontact").val());
  $("#newleadcell").val($("#hiddennewleadcell").val());
  $("#newleademailid").val($("#hiddennewleademailid").val());
  $("#newleadsource").val($("#hiddennewleadsource").val());
  $("#dealerlistdiv").hide();
}

// Function to send SMS

function sendsms(actiontype) {
  if (actiontype == "sms") {
    var cellnumber = $("#smscell"); //alert(cellnumber.innerHTML)
    var leadcardcell = $("#cell");
    var smstext = $("#smstext");
    var error = $("#sms-error");
    var contactperson = $("#contactperson");
    var address = $("#address");
    var stdcode = $("#stdcode");
    var phone = $("#phone");
    var cell = $("#cell");
    var emailid = $("#emailid");
    var leadid = $("#hiddenid");
    if (
      contactperson.val() == "" &&
      address.val() == "" &&
      stdcode.val() == "" &&
      phone.val() == "" &&
      cell.val() == "" &&
      emailid.val() == ""
    ) {
      error.html(errormessage("Please Select a Lead First"));
      return false;
    } else if (leadcardcell.val() == "" && cellnumber.html() == "") {
      error.html(errormessage("Please Save Cell Number and then proceed."));
      leadcardcell.focus();
      return false;
    } else if (smstext.val() == "") {
      error.html(errormessage("Please Enter SMS Text."));
      smstext.focus();
      return false;
    } else if (!validatecell(cellnumber.html())) {
      error.html(errormessage("Please Enter Valid Cell Number."));
      cellnumber.focus();
      return false;
    }
    error.html("");
    var val = "Are you sure you want to send SMS as '" + smstext.val() + "' ?";
    var confirmation = confirm(val);
    if (confirmation) {
      error.html(processing());
      var passdata =
        "&submittype=sendsms&cellnumber=" +
        cellnumber.html() +
        "&smstext=" +
        smstext.val() +
        "&leadid=" +
        leadid.val() +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000); //alert(passdata)
      var queryString = "../ajax/simplelead.php";
      ajaxobjext76 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response == "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            var ajaxresponse = response.split("^"); //alert(ajaxresponse);
            if (ajaxresponse[0] == "1") {
              error.html(successmessage(ajaxresponse[1]));
              smstext.val("");
              showsmslogs(leadid, "");
            } else if (ajaxresponse[0] == "2") {
              error.html(errormessage(ajaxresponse[1]));
            } else {
              error.html(scripterror());
            }
          }
        },
        error: function (a, b) {
          error.html(scripterror());
        },
      });
    } else return false;
  } else if (actiontype == "reset") {
    $("#smscell").html($("#hiddensmscell").val());
    $("#smstext").val("");
    $("#sms-error").html("");
    $("#prior-sms-error").html("");
  }
}

// Function to show sms logs

function showsmslogs(leadid, startlimit) {
  var leadid = $("#hiddenid");
  var passdata =
    "&submittype=showsmslogs&leadid=" +
    leadid.val() +
    "&startlimit=" +
    startlimit +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext77 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          $("#sendsmsc1_1").html(ajaxresponse[1]);
          $("#getmoresmslink").html(ajaxresponse[2]);
        } else {
          $("#sendsmsc1_1").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#sendsmsc1_1").html(scripterror());
    },
  });
}

function getmoreofsmslogs(startlimit, slnocount, showtype) {
  $("#getmoresmslink").html(processing());
  var id = $("#hiddenid").val();
  var passdata =
    "&submittype=showsmslogs&startlimit=" +
    startlimit +
    "&slnocount=" +
    slnocount +
    "&showtype=" +
    showtype +
    "&leadid=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext78 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          $("#resultgridsms").html($("#sendsmsc1_1").html());
          $("#sendsmsc1_1").html(
            $("#resultgridsms")
              .html()
              .replace(/\<\/table\>/gi, "") + ajaxresponse[1]
          );
          $("#getmoresmslink").html(ajaxresponse[2]);
        } else {
          $("#sendsmsc1_1").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#sendsmsc1_1").html(scripterror());
    },
  });
}

function gridtoformofsms(smsid) {
  $("#sms-error").html("");
  var passdata =
    "&submittype=gridtoformsms&smsid=" +
    smsid +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext79 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse = response.split("^"); //alert(ajaxresponse);
        if (ajaxresponse[0] == "1") {
          $("#smscell").val(ajaxresponse[1]);
          $("#smstext").val(ajaxresponse[2]);
        } else {
          $("#sendsmsc1_1").html(scripterror());
        }
      }
    },
    error: function (a, b) {
      $("#sendsmsc1_1").html(scripterror());
    },
  });
}

function countsmslength() {
  var smstext = $("#smstext").val();
  if (smstext.length <= "160")
    $("#sms-error").html("SMS Text Length : " + smstext.length);
  else {
    $("#sms-error").html("SMS Text Length : " + redtext(smstext.length));
  }
}

function abortajaxprocess(type) {
  if (type == "initial") {
    ajaxobjext56.abort();
    $("#gridprocessf").html("");
  } else if (type == "showmore") {
    ajaxobjext58.abort();
    $("#gridprocessf").html("");
  }
}

function abortnofollowupajaxprocess(type) {
  if (type == "initial") {
    ajaxobjext65.abort();
    $("#followuptotaln").html("");
  } else if (type == "showmore") {
    ajaxobjext66.abort();
    $("#followuptotaln").html("");
  }
}

function abortnotviewedajaxprocess(type) {
  if (type == "initial") {
    ajaxobjext67.abort();
    $("#gridprocessnv").html("");
  } else if (type == "showmore") {
    ajaxobjext68.abort();
    $("#gridprocessnv").html("");
  }
}

// Function to open text area to edit remarks
function opentoedit() {
  $("#msg_box").html("");
  $("#showeditimage").hide();
  $("#leadremarksbox").show();
  $("#leadremarks").hide();
  $("#editleadremarks").val($("#hiddenleadremarks").val());
}

// Function to save initial remarks
function closeopentxtbox(type) {
  if (type == "open") {
    var initialremarks = $("#editleadremarks").val();
    if (initialremarks == "") {
      $("#msg_box").html(errormessage("Please Enter the Remarks"));
      $("#editleadremarks").focus();
      return false;
    }
    var confirmation =
      "Are you sure to update the Initial Remarks as " + initialremarks + "??";
    var val = confirm(confirmation);
    if (val) {
      var passdata =
        "&submittype=saveinitialremarks&form_recid=" +
        $("#form_recid").val() +
        "&form_remarks=" +
        initialremarks +
        "&dummy=" +
        Math.floor(Math.random() * 10230000000); //alert(passdata)
      var queryString = "../ajax/simplelead.php";
      ajaxobjext101 = $.ajax({
        type: "POST",
        url: queryString,
        data: passdata,
        cache: false,
        success: function (response, status) {
          if (response == "Thinking to redirect") {
            window.location = "../logout.php";
            return false;
          } else {
            var ajaxresponse4 = response.split("^"); //alert(response);
            if (ajaxresponse4[0] == "1") {
              $("#hiddenleadremarks").val(ajaxresponse4[2]);
              $("#showeditimage").show();
              $("#leadremarksbox").hide();
              $("#leadremarks").show();
              $("#leadremarks").html(ajaxresponse4[2]);
              $("#msg_box").html(successmessage(ajaxresponse4[1]));
            } else {
              $("#msg_box").html(scripterror());
            }
          }
        },
        error: function (a, b) {
          $("#msg_box").html(scripterror());
        },
      });
    } else {
      $("#showeditimage").show();
      $("#leadremarksbox").hide();
      $("#leadremarks").show();
      return false;
    }
  } else if (type == "close") {
    $("#showeditimage").show();
    $("#leadremarksbox").hide();
    $("#leadremarks").show();
  }
}

function abortfollowupajaxprocess(type) {
  if (type == "initial") {
    ajaxobjext67.abort();
    $("#gridprocessnv").html("");
  } else if (type == "showmore") {
    ajaxobjext68.abort();
    $("#gridprocessnv").html("");
  }
}

function checkDataRow(value) {
  var leadid = value;
  var passdata =
    "&submittype=checkforleadid&leadid=" +
    leadid +
    "&dummy=" +
    Math.floor(Math.random() * 10230000000); //alert(passdata)
  var queryString = "../ajax/simplelead.php";
  ajaxobjext101 = $.ajax({
    type: "POST",
    url: queryString,
    data: passdata,
    cache: false,
    success: function (response, status) {
      if (response == "Thinking to redirect") {
        window.location = "../logout.php";
        return false;
      } else {
        var ajaxresponse4 = response;
        //alert(response);
        var split = ajaxresponse4.split("*");
        var strlength = split.length;

        if (split[0] == "1") {
          for (var i = 1; i < strlength; i++) {
            alert(split[i]);
            $('#form_leadstatus option[value="' + split[i] + '"]').attr(
              "disabled",
              "disabled"
            );
          }
          //$("#form_leadstatus option[value='Demo Given']").attr("disabled", "disabled");
        }
        if (split[0] == "2") {
          for (var i = 1; i < strlength; i++) {
            alert(split[i]);
            $('#form_leadstatus option[value="' + split[i] + '"]').removeAttr(
              "disabled"
            );
          }
          //$("#form_leadstatus option[value='Demo Given']").removeAttr("disabled");
        }

        /*alert(response);
						var split = ajaxresponse4.split("*");
						console.log(split[1]);
						return false;
						alert(strlength);*/
      }
    },
    error: function (a, b) {
      $("#msg_box").html(scripterror());
    },
  });
}

/*function showtheeditimage(type)
{
	if(type == 'show')
	{
		$("#hoverimage").show();
		$("#showeditimage").hide();
	}
	else
	{
		$("#hoverimage").hide();
		$("#showeditimage").show();
	}
}*/

// customer -----------------

function previewQuote() {
  // Retrieve values from input fields
  const gstin = document.getElementById("gstin").value;
  const remarks = document.getElementById("remarks").value;

  // Get all product rows
  const productRows = document.querySelectorAll("#adddescriptionrows tr");

  // Create an overlay element
  var overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
  overlay.style.zIndex = "9999"; // Ensure the overlay is on top of other elements
  overlay.style.overflow = "auto"; // Enable scrolling if the content is too large

  // Create a container for the entire HTML content
  var container = document.createElement("div");
  container.style.backgroundColor = "white"; // Transparent background color for the content
  container.style.borderRadius = "5px"; // Rounded corners
  container.style.width = "80%"; // Set width to 80% of the viewport width

  container.style.maxWidth = "600px"; // Limit the maximum width to 800px
  container.style.margin = "10% auto"; // Center the container
  container.style.padding = "20px"; // Add padding to the container

  // Create the quotation template
  var quotationTemplate = `
  <html>
  
  <head>
      <meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />
  </head>
  
  <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="3" align="center" style="border:solid 2px #ACACAC">
          <tr>
              <td>&nbsp;</td>
          </tr>
          <tr>
              <td></td>
          </tr>
          <tr>
              <td>
                  <table width="100%" border="0" cellspacing="0" cellpadding="5" style="font-family:calibri">
                      <tr>
                          <td>
                              <table width="90%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
  
                                      <td width="50%">Date: 26/10/2023<br>
                                          RELYON SOFTECH LIMITED<br>
                                          No. 73, Shreelekha Complex, WOC Road, Bangalore - 560 086
                                          <br>
                                          <strong>GSTIN: </strong>29AABCR7796N1ZC | <strong>PAN:</strong> AABCR7796N <br>
                                          <strong>CIN No.:</strong> U72200KA2000PLC027572 | <strong>PAN:</strong>
                                          AABCR7796N
                                      </td>
  
  
                                      <td width="50%"><img src="cid:8888888888" alt="Relyon" width="189" height="66"
                                              align="right"></td>
                                  </tr>
  
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#7aacdd" height="10px" align="center"><strong style="font-size: 22;">Quotation for
                                  Saral Software</strong></td>
                      </tr> <br>
                      <tr>
                          <td colspan="2">
                              <font color="#FF0000"><strong>Quotation Number: RSL/1035/2023-24</strong> </font> <br>
                              <font color="#FF0000"><strong>Quote Valid Until: 05/11/2023</strong></font>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p><strong>Customer Details:</strong><br>
                                  <strong>GSTIN:</strong> 29AACCP4397E1Z5<br>
                                  <strong>Name:</strong> PRATHAM MOTORS PVT LTD<br>
                                  <strong>Place:</strong> SURVEY NO 16, OUTER RING ROAD, Bangalore-560037<br>
                                  <strong>Prn Name:</strong> PRASAD SHETTY / Sathish P<br>
                                  <strong>Email:</strong> fc@prathammotors.com / it@prathammotors.com<br>
                                  <strong>Mobile:</strong> 9591916522
                              </p>
  
                              <p><strong>Seller Details:</strong><br>
                                  <strong>Mtg Extv:</strong> NAVEEN KUMAR G M<br>
                                  <strong>Mobile:</strong> 9449599738<br>
                                  <strong>Email:</strong> naveen.kumar@relyonsoft.com<br>
                                  <strong>URL:</strong> <a href="www.relyonsoft.com">www.relyonsoft.com</a><br>
                              </p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <p>Dear Sir/Madam,</p>
                              <p>We thank you for your interest in our Software. Relyon has more than 35,000 customers
                                  spread across India with more than 100,000 users using our solutions. Relyon has served
                                  varied verticals like Banks, Telecom, Manufacturing, Textile, IT/ITES, Hospitality,
                                  Health Care, Education etc. This makes us the natural choice for many Organizations and
                                  Professionals.</p>
                              <p>As per your requirement, we furnish herein below our competitive offer for the same.</p>
                              <table width="100%" border="1" cellspacing="0" cellpadding="3">
                                  <tr>
                                      <td><strong>Sl. No.</strong></td>
                                      <td><strong>Description</strong></td>
                                      <td><strong>Purchase Type</strong></td>
                                      <td><strong>Usage Type</strong></td>
                                      <td><strong>Amount</strong></td>
                                  </tr>
                                  
`;

  // Add product data to the quotation template
  productRows.forEach((row, index) => {
    if (index !== -1) {
      // Skip the header row
      const cells = row.querySelectorAll("td");
      const productName = cells[1].querySelector('input[type="text"]').value;
      const purchaseType = cells[2].querySelector("select").value;
      const usageType = cells[3].querySelector("select").value;
      const amount = cells[4].querySelector('input[type="text"]').value;

      // Adjust index to start from 1
      const serialNumber = index + 1;

      quotationTemplate += `
            <tr>
                <td>${serialNumber}</td>
                <td>${productName}</td>
                <td>${purchaseType}</td>
                <td>${usageType}</td>
                <td>${amount}</td>
            </tr>
        `;
    }
  });

  // Add the closing tags to the quotation template
  quotationTemplate += `
          </table>
          <p>The above offers are covered under the following Terms:</p>
          <p><strong>Payments:</strong> 100% payment at the successful installation of the product<br>
          <strong>Delivery:</strong> Within a week from the date of the Purchase order.<br>
          <span style="color: #FF0000;"> <strong>Taxes:</strong> Extra as applicable (18% GST).
          </p>
          </span>
          <p>We hope our Quotation is in line with your requirement. However, for any commercial &
          technical clarifications please feel free to contact us. We look forward to your
          valuable & Precious Order.</p>
          <p>Thanking You, <br> Sincerely Yours,<br>
          for RELYON SOFTECH LTD, <br> NAVEEN KUMAR G M</p>
          <td>
          </td>
          </tr>
          </table>
          </td>
          </tr>
          <tr>
          <td></td>
          </tr>
          </table>

          <button onclick="process()" style="display: block; margin:auto; padding: 5px 10px;cursor: pointer;">Proceed</button>


          </body>
          
          </html>
  `;

  // Set the quotation template as the inner HTML of the container
  container.innerHTML = quotationTemplate;

  // Append the container to the overlay
  overlay.appendChild(container);

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Close the overlay when clicking outside of the content
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.remove();
    }
  });
}

function process() {
  // Add your code here to proceed to payment
  console.log("Sending quote...");
}
