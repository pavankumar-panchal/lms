<?php


include("../inc/checklogin.php");
if ($cookie_usertype <> "Admin") {
  header("Location:../home");
}
if ($cookie_lastlogindate == "First Time") {
  header('Location:../profile/first_time_login.php');
}
?>

<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>LMS | Admin Dashboard</title>
  <link rel="stylesheet" type="text/css" href="../css/style.css?dummy=<?php echo (rand()); ?>">
  <script src="../functions/jsfunctions.js?dummy=<?php echo (rand()); ?>" language="javascript"></script>
  <script type="text/javascript" src="../functions/jquery.js?dummy=<?php echo (rand()); ?>"></script>
  <script type="text/javascript" src="../functions/highcharts-new.js?dummy=<?php echo (rand()); ?>"></script>
  <script type="text/javascript" src="../functions/excanvas.compiled.js"></script>

  <script src="../functions/indextable.js?dummy=<?php echo (rand()); ?>" language="javascript"></script>

</head>

<body onload="retrievedata()">

  <table width="950" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td class="pageheader">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="28">
              <?php include("../inc/header1.php"); ?>
            </td>
          </tr>
          <tr>
            <td height="58" valign="top">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td height="4"></td>
                </tr>
                <tr>
                  <td height="54">
                    <table width="99%" border="0" align="center" cellpadding="2" cellspacing="0">
                      <tr>
                        <td width="14%"><a href="http://lms.relyonsoft.net"><img src="../images/lms-logo.gif"
                              alt="Lead Management Software" width="100" height="50" border="0" /></a></td>
                        <td width="86%">
                          <?php include("../inc/navigation.php"); ?>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td height="1"></td>
    </tr>
    <tr>
      <td valign="middle" bgcolor="#D2D8FB" class="contentheader">
        <table width="99%" border="0" align="center" cellpadding="4" cellspacing="0">
          <tr>
            <td>Dashboard</td>


          </tr>
          <tr>
            <!-- <td class="bannerbg" height="50" style="background:red;color:#fff;text-align:center;font-size:21px">TEST LINK</td> -->
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td height="2"></td>
    </tr>
    <tr>
      <td height="1" bgcolor="#006699"></td>
    </tr>
    <tr>
      <td valign="top" class="content">
        <table width="100%" border="0" cellspacing="0" cellpadding="2">

          <tr>
            <td height="20"></td>
          </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="4" style="border:2px solid #CCCCCC">
          <tr>
            <td height="20" colspan="9">
              <div align="center" style=" color:#0099CC; font-size:16px"><strong>Lead Volume Analysis</strong></div>
            </td>
          </tr>
          <tr>
            <td height="20" colspan="9"></td>
          </tr>
          <tr>
            <td width="6%">
              <div align="right">Period : </div>
            </td>
            <td width="13%"><select name="period" id="period" class="formfields" style="width:90%">
                <option value="thismonth" selected="selected">This Month</option>
                <option value="lastmonth">Last Month</option>
                <option value="thisfinancialyear">This Year</option>
                <option value="lastfinancialyear">Last Year</option>
              </select>
            </td>
            <td width="7%">
              <div align="right">Source :</div>
            </td>
            <td width="18%">
              <select name="source" id="source" class="formfields" style="width:90%">
                <option value="" selected="selected">- - - All - - -</option>
                <option value="Product Download">Web Downloads</option>
                <option value="Manual Upload">Manual Uploads</option>
              </select>
            </td>
            <td width="5%">
              <div align="right">Area :</div>
            </td>
            <td width="12%"><select name="area" id="area" class="formfields" style="width:90%">
                <option value="" selected="selected">- - All - - </option>
                <option value="CSD">CSD</option>
                <option value="BKG">BKG</option>
                <option value="BKM">BKM</option>
              </select></td>
            <td width="12%">
              <div align="right">Product Group :</div>
            </td>
            <td width="15%"><label>
                <select name="productgroup" id="productgroup" class="formfields" style="width:90%">
                  <option value="" selected="selected"> - - All - - </option>
                  <option value="SPP">SPP</option>
                  <option value="STO">STO</option>
                  <option value="TDS">TDS</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </label></td>
            <td width="12%"><input name="gobutton" type="button" class="formbutton" id="gobutton" value="Go &raquo;"
                onclick="retrievedata()" />
              <input name="hiddenvalue" type="hidden" value="" id="hiddenvalue" />
              </strong>
              <input type="hidden" name="alldates" id="alldates" />
              <input type="hidden" name="yaxisscale" id="yaxisscale" />
              <input type="hidden" name="xaxisscale" id="xaxisscale" />
            </td>
          </tr>
          <tr>
            <td colspan="9">
              <div id="container" style="width: 800px; height: 300px; margin: 0 auto">
                <script type="text/javascript"
                  src="../functions/highchartadmin.js?dummy=<?php echo (rand()); ?>"></script>
              </div>
          <div class="gap" style="margin-top:20px;">

              <?php include("indextable.php"); ?>

              </div>
              <div id="getmorelinknv1" align="left" style="height: 20px; padding: 5px; margin-top: 10px;">
              </div>
          <tr>
            <td colspan="3">
              <div id="resultgridnv1" style="overflow: auto; display: none; height: 150px; width: 100%;" align="center">
                &nbsp;</div>
            </td>
          </tr>
      </td>
    </tr>
  </table>

  <table width="100%" border="0" cellspacing="0" cellpadding="2">
    <tr>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td valign="top">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="border:#666666 1px solid">
              <table width="100%" border="0" cellspacing="0" cellpadding="2">
                <tr>
                  <td bgcolor="#0099CC"><strong>
                      <font color="#FFFFFF">Additional Links:</font>
                    </strong> </td>
                </tr>
                <tr>
                  <td>
                    <div align="center"><a href="./dlrdownloads.php">Advanced Downloads of Relyon </a>| <a
                        href="http://accountability.co.in/scm" target="_blank">Scratch Card Download
                        Application</a></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td height="20"></td>
    </tr>
  </table>
  </td>
  </tr>
  <tr>
    <td height="1"></td>
  </tr>
  <tr>
    <td valign="top" class="pagefooter">
      <table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td height="8"></td>
        </tr>
        <tr>
          <td>
            <table width="100%" border="0" cellpadding="4" cellspacing="0" class="footer">
              <tr>
                <td width="50%">Copyright © Relyon Softech Limited. All rights reserved. </td>
                <td width="50%">
                  <div align="right"><a href="http://www.relyonsoft.com" target="_blank">www.relyonsoft.com</a> | <a
                      href="http://www.saraltaxoffice.com" target="_blank">www.saraltaxoffice.com</a> | <a
                      href="http://www.saralpaypack.com" target="_blank">www.saralpaypack.com</a> | <a
                      href="http://www.saraltds.com" target="_blank">www.saraltds.com</a></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <!-- <td class="bannerbg" height="50" style="background:red;color:#fff;text-align:center;font-size:21px">TEST LINK</td> -->
  </tr>
  </table>
</body>

</html>