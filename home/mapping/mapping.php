<?php
	include("../inc/checklogin.php");

	$getdlrid = $_GET['dlrid'];
	$query = "SELECT * FROM dealers WHERE id = '".$getdlrid."'";
	$result = runmysqlquery($query);
	$count = mysqli_num_rows($result);
	if($count == 0)
	header("Location:./index.php");
	else
	{
		$fetch = mysqli_fetch_array($result);
		$mapdlrcompany = $fetch['dlrcompanyname'];
		setcookie(mapdlrid,$getdlrid,time()+3600000, "/");
		//lmscreatecookie('mapdlrid',$getdlrid);
	}
	$query = "SELECT distinct category FROM products ORDER BY category";
	$result = runmysqlquery($query);
	$prdcategory = '<option value="" selected="selected">- - -Make a Selection- - -</option>';
	while($fetch = mysqli_fetch_array($result))
	{
		$prdcategory .= '<option value="'.$fetch['category'].'">'.$fetch['category'].'</option>';
	}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>LMS | Mapping</title>
<link rel="stylesheet" type="text/css" href="../css/style.css?dummy=<?php echo (rand());?>">
<script src="../functions/jquery-1.4.2.min.js?dummy=<?php echo (rand());?>" language="javascript"></script>
<script src="../functions/jsfunctions.js?dummy=<?php echo (rand());?>" language="javascript"></script>
<script src="../functions/mapping2.js?dummy=<?php echo (rand());?>" language="javascript"></script>
<!--[if lt IE 7]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE7.js"></script>
<![endif]-->
</head>
<body onload="griddata('');">
<table width="950" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td class="pageheader"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="28"><?php include("../inc/header1.php"); ?></td>
      </tr>
      <tr>
        <td height="58" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="4"></td>
          </tr>
          <tr>
            <td height="54"><table width="99%" border="0" align="center" cellpadding="2" cellspacing="0">
              <tr>
                <td width="14%"><a href="http://lms.relyonsoft.net"><img src="../images/lms-logo.gif" alt="Lead Management Software" width="100" height="50" border="0" /></a></td>
                <td width="86%"><?php include("../inc/navigation.php"); ?></td>
              </tr>
            </table></td>
          </tr>
          
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="1"></td>
  </tr>
  <tr>
    <td valign="middle" bgcolor="#D2D8FB" class="contentheader"><table width="99%" border="0" align="center" cellpadding="4" cellspacing="0">
      <tr>
        <td >Web leads mapping</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="2"></td>
  </tr>
  <tr>
    <td height="1" bgcolor="#006699"></td>
  </tr>
  <tr>
    <td valign="top" class="content"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="20"></td>
      </tr>
      <tr>
        <td height="300" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="2">
          <tr>
            <td style="border:#666666 1px solid"><table width="100%" border="0" cellspacing="0" cellpadding="2">
                <tr>
                  <td><strong>Configure mapping for &quot;<?php echo($mapdlrcompany); ?>&quot;:</strong></td>
                </tr>
                <tr>
                  <td><form id="mappingform" name="mappingform" method="post" action="">
                      <table width="100%" border="0" cellspacing="0" cellpadding="6">

                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td><div align="right"><a href="./index.php">Select a different Dealer</a></div></td>
                        </tr>
                        <tr>
                          <td width="147">State:
                            <input name="form_recid" type="hidden" id="form_recid" />
                            <input name="form_dealerid" type="hidden" id="form_dealerid" value="<?php echo($getdlrid); ?>" /></td>
                          <td width="302"><select name="form_state" class="formfields" id="form_state" onchange="districtselect()">
                              <?php include('../inc/state.php')?>
                          </select></td>
                          <td width="106">District:</td>
                          <td width="337"><div id="districtdiv">
                              <select name="form_district" class="formfields" id="form_district" onchange="regionselect()">
                                <option value = "">- - - -Select a State First - - - -</option>
                              </select>
                          </div></td>
                        </tr>

                        <tr>
                          <td>Region:</td>
                          <td><div id="regiondiv">
                  <select name="form_region" class="formfields" id="form_region">
                    <option value = "">- - - -Select a District First - - - -</option>
                  </select>
                    </div></td>
                          <td>Product Category:</td>
                          <td><select name="form_prdcategory" class="formfields" id="form_prdcategory">
                            <?php
						echo($prdcategory);
						?>
                          </select></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="3" id="msg_box">&nbsp;</td>
                          <td><div align="center">
                              <input name="new" type="button" class="formbutton" id="new" value="New" onclick="newentry();" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input name="save" type="button" class="formbutton" id="save" value="Save" onclick="formsubmit('save');" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input name="delete" type="button" class="formbutton" id="delete" value="Delete" onclick="formsubmit('delete');" />
                          </div></td>
                        </tr>
                      </table>
                  </form></td>
                </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><table width="100%" border="0" cellspacing="0" cellpadding="2">
                <tr>
                  <td width="42%"><strong>Mapping data for <?php echo($mapdlrcompany); ?>:<span id="gridprocess"></span></strong></td>
                  <td width="23%"><div align="center"><span id="totalcount"></span></div></td>
                  <td width="35%">&nbsp;</td>
                </tr>
                <tr>
                 <td colspan="5" style="border:1px solid #333333;"><div id="tabgroupgridc1" style="overflow:auto; height:250px;  padding:2px;" align="center"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                          <td><div id="tabgroupgridc1_1" align="center"></div></td>
                                        </tr>
                                        <tr>
                                          <td><div id="getmorelink"  align="left" style="height:20px; padding:2px;"> </div></td>
                                        </tr>
                                      </table></div><div id="resultgrid" style="overflow:auto; display:none; height:150px; width:704px; padding:2px;" align="center">&nbsp;</div></td>
                </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height="20"></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="1"></td>
  </tr>
  <tr>
    <td valign="top" class="pagefooter"><table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td height="8"></td>
      </tr>
      <tr>
        <td><table width="100%" border="0" cellpadding="4" cellspacing="0" class="footer">
            <tr>
              <td width="50%">Copyright © Relyon Softech Limited. All rights reserved. </td>
              <td width="50%"><div align="right"><a href="http://www.relyonsoft.com" target="_blank">www.relyonsoft.com</a> | <a href="http://www.saraltaxoffice.com" target="_blank">www.saraltaxoffice.com</a> | <a href="http://www.saralpaypack.com" target="_blank">www.saralpaypack.com</a> | <a href="http://www.saraltds.com" target="_blank">www.saraltds.com</a></div></td>
            </tr>
          </table></td>
      </tr>
    </table></td>
  </tr>
</table>

    
</body>
</html>
