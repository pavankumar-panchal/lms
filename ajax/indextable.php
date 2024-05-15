<?php

ini_set("memory_limit", "-1");
include("../inc/ajax-referer-security.php");
include("../functions/phpfunctions.php");
include("../inc/getuserslno.php");

$submittype = $_POST['submittype'];
switch ($submittype) {

	case "gridtoform":
		if (lmsgetcookie('lmsusername') <> '' && lmsgetcookie('lmsusersort') <> '') {
			$cookie_username = lmsgetcookie('lmsusername');
			$cookie_usertype = lmsgetcookie('lmsusersort');
			$form_recid = $_POST['form_recid'];
			$query = "select * from leads where id = '" . $form_recid . "'";
			$result = runmysqlqueryfetch($query);
			$leadid = $result['id'];

			$query = "select leads.id AS id, leads.company AS company,leads.leadsubstatus AS leadsubstatus, leads.name AS name, leads.phone AS phone,leads.stdcode AS stdcode, leads.cell AS cell, leads.dealerviewdate AS dealerviewdate, leads.emailid AS emailid, leads.address AS address, leads.refer AS refer, 
			leads.source AS source, leads.leaddatetime AS leaddatetime, leads.leadstatusremarks ,regions.distname AS distname, regions.statename AS statename, dealers.dlrcompanyname AS dealername, lms_managers.mgrname AS managername, leads.leadstatus AS leadstatus, leads.leaduploadedby AS leaduploadedby, leads.lastupdatedby AS lastupdatedby, leads.leadremarks AS leadremarks, leads.lastupdateddate AS lastupdateddate, products.productname AS product, lms_dlrmembers.dlrmbrname AS dlrmbrname,products.id as productid,dealers.id as dealerid from (select * from leads WHERE leads.id = '" . $form_recid . "') AS leads join dealers on dealers.id = leads.dealerid join lms_managers on lms_managers.id = dealers.managerid join products on products.id = leads.productid join regions on leads.regionid = regions.subdistcode left outer join lms_dlrmembers on leads.dlrmbrid = lms_dlrmembers.dlrmbrid";
			$result = runmysqlqueryfetch($query);

			$dealerviewdate = ($result['dealerviewdate'] == '0000-00-00 00:00:00') ? ('Not yet Seen') : (changedateformatwithtime($result['dealerviewdate']));
			$dlrmbrname = ($result['dlrmbrname'] == "") ? "Not Assigned" : $result['dlrmbrname'];
			$givenby = ($result['source'] == "Manual Upload") ? getuserdisplayname($result['leaduploadedby']) : "Webmaster";


			$output = $leadid . "|^|" . $result['company'] . "|^|" . $result['id'] . "|^|" . $result['name'] . "|^|" . $result['address'] . "|^|" . $result['distname'] . "|^|" . $result['statename'] . "|^|" . $result['stdcode'] . "|^|" . $result['phone'] . "|^|" . $result['cell'] . "|^|" . $result['emailid'] . "|^|" . $result['refer'] . "|^|" . $result['source'] . "|^|" . $givenby . "|^|" . changedateformatwithtime($result['leaddatetime']) . "|^|" . $dealerviewdate . "|^|" . $result['product'] . "|^|" . $result['dealername'] . "|^|" . $dlrmbrname . "|^|" . $result['managername'] . "|^|" . $result['leadstatus'] . "|^|" . $lastupdatedbyname . "|^|" . $lastupdateddate . "|^|" . $leadremarks . "|^|" . $result['lastupdatedby'] . "|^|" . $userslno . "|^|" . $givenbytooltiptext . "|^|" . $dealertooltiptext . "|^|" . $managertooltiptext . "|^|" . $result['productid'] . "|^|" . $result['dealerid'] . "|^|" . $givenbyid . "|^|" . $dealerdisplay . "|^|" . $dealermember . "|^|" . $result['leadstatusremarks'] . "|^|" . $result['leadsubstatus'];
			echo ('1|^|' . $output);
		}
		break;

	case "showfollowups":
		if (lmsgetcookie('lmsusername') <> '' && lmsgetcookie('lmsusersort') <> '') {
			$cookie_username = lmsgetcookie('lmsusername');
			$cookie_usertype = lmsgetcookie('lmsusersort');
			$leadid = $_POST['form_recid'];
			$query = "SELECT lms_followup.followupid AS id, lms_followup.leadid, lms_followup.entereddate AS entereddate, lms_followup.remarks AS remarks, lms_followup.followupdate AS followupdate, lms_followup.followuptime AS followuptime, lms_followup.enteredby AS enteredby FROM lms_followup WHERE lms_followup.leadid = '" . $leadid . "' ORDER BY lms_followup.followupid DESC";
			$grid = '<table width="100%" border="0" bordercolor="#ffffff" cellspacing="0" cellpadding="2" id="gridtable"><tbody>';

			$grid .= '<tr class="gridheader"><td width="9%" nowrap="nowrap"  class="tdborder">Sl No</td><td width="9%" nowrap="nowrap"  class="tdborder">Lead ID</td>  <td width="14%" nowrap="nowrap"  class="tdborder">Date</td><td width="37%" nowrap="nowrap"  class="tdborder">Remarks</td><td width="20%" nowrap="nowrap"  class="tdborder">Next Follow-up</td><td width="20%" nowrap="nowrap"  class="tdborder">Next Follow-up Time</td><td width="20%" nowrap="nowrap"  class="tdborder">Entered by</td></tr>';
			$result = runmysqlquery($query);
			$resultcount = mysqli_num_rows($result);
			$loopcount = 0;
			if ($resultcount > 0) {
				while ($fetch = mysqli_fetch_array($result)) {
					$loopcount++;
					$grid .= '<tr class="gridrow" onclick="javascript:followuptoform(\'' . $fetch['id'] . '\');"  >';
					$grid .= "<td nowrap='nowrap' class='tdborder'>" . $loopcount . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . $fetch['leadid'] . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . changedateformat($fetch['entereddate']) . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . gridtrim30($fetch['remarks']) . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . changedateformat($fetch['followupdate']) . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . changedateformat($fetch['followuptime']) . "</td>" .
						"<td nowrap='nowrap' class='tdborder'>" . getuserdisplayname($fetch['enteredby']) . "</td>";
					$grid .= '</tr>';
				}
			}
			//End of Table
			$grid .= '</tbody></table>';
			echo ('1^' . $grid);
		} else
			echo ("2^Your login might have expired. Please Logout and Login.");
		break;

	case 'followupforday':
		if (lmsgetcookie('lmsusername') <> '' && lmsgetcookie('lmsusersort') <> '') {
			$cookie_username = lmsgetcookie('lmsusername');
			$cookie_usertype = lmsgetcookie('lmsusersort');	 //echo($cookie_usertype);exit;
			$startlimit = $_POST['startlimit'];
			$slnocount = $_POST['slnocount'];
			$showtype = $_POST['showtype'];
			if ($showtype == 'all')
				$limit = 1000;
			else
				$limit = 10;
			if ($startlimit == '') {
				$startlimit = 0;
				$slnocount = 0;
			} else {
				$startlimit = $slnocount;
				$slnocount = $slnocount;
			}

			switch ($cookie_usertype) {
				case 'Admin':
				case 'Sub Admin':


					// $query="SELECT DISTINCT leads.id, lms_followup.followupid AS followup_id, leads.leaddatetime, lms_followup.remarks, lms_followup.followupdate, lms_users.type AS enteredby FROM leads LEFT JOIN lms_followup ON lms_followup.leadid = leads.id LEFT JOIN lms_users ON lms_users.id = lms_followup.enteredby LEFT JOIN dealers ON dealers.id = leads.dealerid LEFT JOIN lms_managers ON lms_managers.id = dealers.managerid LEFT JOIN products ON products.id = leads.productid LEFT JOIN regions ON leads.regionid = regions.subdistcode WHERE lms_followup.followupdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 2 DAY) AND CURDATE() AND lms_followup.followupstatus = 'PENDING' AND leads.leadstatus NOT IN ('Fake Enquiry', 'Not Interested', 'Order Closed', 'Registered User') AND lms_followup.followupdate <> '0000-00-00' ORDER BY lms_followup.followupdate DESC";

					$query = "SELECT DISTINCT leads.id, lms_followup.followupid AS followup_id, leads.leaddatetime, lms_followup.remarks, lms_followup.followupdate, lms_users.type AS enteredby 
          FROM leads 
          LEFT JOIN lms_followup ON lms_followup.leadid = leads.id 
          LEFT JOIN lms_users ON lms_users.id = lms_followup.enteredby 
          LEFT JOIN dealers ON dealers.id = leads.dealerid 
          LEFT JOIN lms_managers ON lms_managers.id = dealers.managerid 	
          LEFT JOIN products ON products.id = leads.productid 
          LEFT JOIN regions ON leads.regionid = regions.subdistcode 
          WHERE lms_followup.followupdate = CURDATE() -- Only fetch records where followupdate is equal to the current date
            AND lms_followup.followupstatus = 'PENDING' 
            AND leads.leadstatus NOT IN ('Fake Enquiry', 'Not Interested', 'Order Closed', 'Registered User') 
            AND lms_followup.followupdate <> '0000-00-00' 
          ORDER BY lms_followup.followupdate DESC";

					break;
			}
			//echo($query);exit;
			if ($slnocount == '0') {
				$grid = '<table width="100%" border="0" bordercolor="#ffffff" cellspacing="0" cellpadding="2" id="gridtablelead">';
				//Write the header Row of the table
				$grid .= '<tr class="gridheader" ><td nowrap="nowrap" class="tdborderlead">Sl No</td><td nowrap="nowrap"  class="tdborderlead">Lead ID</td><td nowrap="nowrap"  class="tdborderlead">Followup ID</td><td nowrap="nowrap"  class="tdborderlead">Followup Date</td><td nowrap="nowrap"  class="tdborderlead">Remarks</td><td nowrap="nowrap"  class="tdborderlead">Next Follow-up</td><td nowrap="nowrap"  class="tdborderlead">Enterd by</td></tr><tbody>';
			}
			$result = runmysqlquery($query);
			// ?????      
			$fetchresultcount = mysqli_num_rows($result);
			$addlimit = " LIMIT " . $startlimit . "," . $limit . "; ";
			$query1 = $query . $addlimit;
			$result1 = runmysqlquery($query1);
			//echo($query1); exit;
			while ($fetch = mysqli_fetch_row($result1)) {
				$slnocount++;
				//Begin a row
				$grid .= '<tr class="gridrow" onclick="javascript:gridtoform(\'' . $fetch[0] . '\');">';
				$grid .= "<td nowrap='nowrap' class='tdborderlead'>&nbsp;" . $slnocount . "</td>";
				//Write the cell data
				for ($i = 0; $i < count($fetch); $i++) {
					if ($i == 1)
						$grid .= "<td nowrap='nowrap' class='tdborderlead'>&nbsp;" . changedateformatwithtime($fetch[$i]) . "</td>";
					else
						$grid .= "<td nowrap='nowrap' class='tdborderlead'>&nbsp;" . gridtrim30($fetch[$i]) . "</td>";
				}
				$grid .= '</tr>';
			}
			$grid .= "</tbody></table>";
			if ($slnocount >= $fetchresultcount)
				$linkgrid .= '<table width="100%" border="0" cellspacing="0" cellpadding="0" height ="20px"><tr><td bgcolor="#FFFFD2"><font color="#FF4F4F">No More Records</font><div></div></td></tr></table>';
			else
				$linkgrid .= '<table><tr><td ><div align ="left" style="padding-right:10px"><a onclick ="getmorerecordsfollowup(\'' . $startlimit . '\',\'' . $slnocount . '\',\'more\');" style="cursor:pointer" class="resendtext">Show More Records >> </a><a onclick ="getmorerecordsfollowup(\'' . $startlimit . '\',\'' . $slnocount . '\',\'all\');" class="resendtext1" style="cursor:pointer"><font color = "#000000">(Show All Records)</font></a></div></td></tr></table>';
			$k = 0;
			while ($fetch2 = mysqli_fetch_row($result)) {

				for ($i = 0; $i < count($fetch2); $i++) {
					if ($i == 0)
						if ($k == 0)
							$leadidarray .= $fetch2[$i];
						else
							$leadidarray .= '$' . $fetch2[$i];
					$k++;
				}
			}
			echo ('1^' . $grid . '^' . $linkgrid . '^' . $fetchresultcount . '^' . $leadidarray);
			//echo('1^'.$query1.'^'.$limit);
		}
		break;


}


?>