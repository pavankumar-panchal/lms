function gridtoform(id) {
  sendsms("reset");
  resetproductchange();
  $("#showeditimage").hide();
  $("#leadremarksbox").hide();
  var error = $("#messagebox1");

  var passdata =
    "&submittype=gridtoform&form_recid=" +
    id +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100); //alert(passdata)
  var queryString = "../ajax/indextable.php";
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
          if (
            $("#hiddentype").val() == "Admin" ||
            $("#hiddentype").val() == "Sub Admin" ||
            $("#hiddentype").val() == "Reporting Authority"
          ) {
            //document.getElementById('displaydiv').style.display = 'block';
            $("#link").show();
            $("#dealerlist1").val("");
          }
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

function showfollowups(leadid) {
  $("#followupmessage").html(processing());
  var passdata =
    "&submittype=showfollowups&form_recid=" +
    leadid +
    "&dummy=" +
    Math.floor(Math.random() * 100032680100);
  var queryString = "../ajax/indextable.php";
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
  var queryString = "../ajax/indextable.php";
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

function leadtrack(type) {
  if (type == "tracker") {
  } else if (type == "productchange") {
  } else if (type == "sendsms") {
    getmynumber();
  }
}

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

function sendsms(actiontype) {
  if (actiontype == "sms") {
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
      var queryString = "../ajax/indextable.php";
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
  }
}
