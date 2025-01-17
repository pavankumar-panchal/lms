<?php
error_reporting(1);

if (file_exists("../inc/dbconfig.php")) {
	include("../inc/dbconfig.php");
} else {
	include("inc/dbconfig.php");

}

// //
// Connect to host (Primary database)
$newconnection = mysqli_connect($dbhost, $dbuser, $dbpwd, $dbname);
if (!$newconnection) {
	die("Cannot connect to MySQL server host: " . mysqli_connect_error());
}

// Connect to log host (Log database)
$newconnection_log = mysqli_connect($dbhost_log, $dbuser_log, $dbpwd, $dbname_log);
if (!$newconnection_log) {
	die("Cannot connect to MySQL log server host: " . mysqli_connect_error());
}

function datetimelocal($format)
{
	$diff_timestamp = date('U');
	$date = date($format, $diff_timestamp);
	return $date;
}

/* -------------------- Upload ZIP file through PHP -------------------- */
function fileupload($filename, $filetempname)
{
	//check that we have a file
	//Check if the file is JPEG image and it's size is less than 350Kb

	//retrieve the date.
	$date = datetimelocal('YmdHis-');
	$filebasename = $date . basename($filename);
	$ext = substr($filebasename, strrpos($filebasename, '.') + 1);
	if ($ext == "zip") {
		$newname = $_SERVER['DOCUMENT_ROOT'] . '/sssm-beta/upload/' . $filebasename;
		$downloadlink = 'http://' . $_SERVER['HTTP_HOST'] . '/sssm-beta/upload/' . $filebasename;
		if (!file_exists($newname)) {
			if ((move_uploaded_file($filetempname, $newname))) {
				$result = $newname; //Upload successfull
			} else {
				$result = 4; //Problem dusring upload
			}
		} else {
			$result = 3; //File already exists by same name
		}
	} else {
		$result = 2; //Extension doesn't match
	}
	return $result;
}

/* -------------------- Download any file through PHP header -------------------- */
function downloadfile($filelink)
{
	$filename = basename($filelink);
	header('Content-type: application/octet-stream');
	header('Content-Disposition: attachment; filename=' . $filename);
	readfile($filelink);
}

/* -------------------- Run a query to database -------------------- */
// function runmysqlquery($query)
// {
// 	global $newconnection;
// 	$dbname = 'relyon_lms';

// 	//Connect to Database
// 	mysqli_select_db($newconnection, $dbname) or die("Cannot connect to database");
// 	set_time_limit(3600);
// 	//Run the query
// 	$result = mysqli_query($newconnection, $query) or die(" run Query Failed in Runquery function1." . $query); //;

// 	//Return the result
// 	return $result;
// }


function runmysqlquery($query, $param_types = '', ...$params)
{
	global $newconnection;
	$dbname = 'relyon_lms';

	// Connect to the database
	mysqli_select_db($newconnection, $dbname) or die("Cannot connect to database");
	// Prepare the query

	$stmt = mysqli_prepare($newconnection, $query);
	if ($stmt === false) {
		die("MySQLi prepare error: " . mysqli_error($newconnection));
	}

	// Bind parameters if there are any
	if (!empty($param_types)) {
		mysqli_stmt_bind_param($stmt, $param_types, ...$params);
	}

	// Execute the query
	mysqli_stmt_execute($stmt) or die("Query execution failed: " . mysqli_error($newconnection));

	// Get the result if it's a SELECT query
	$result = mysqli_stmt_get_result($stmt);

	// Close the statement
	mysqli_stmt_close($stmt);

	// Return the result for SELECT queries or true/false for other queries
	return $result ? $result : true;
}




/* -------------------- Run a query to log database -------------------- */
function runmysqlquery_log($query)
{
	global $newconnection_log;
	$dbname_log = 'relyon_lms';

	//Connect to Database
	mysqli_select_db($newconnection_log, $dbname_log) or die("Cannot connect to database");
	set_time_limit(3600);
	//Run the query
	$result = mysqli_query($newconnection_log, $query) or die(" run Query Failed in Runquery function1." . $query); //;

	//Return the result
	return $result;
}


/* -------------------- Run a query to database with fetching from SELECT operation -------------------- */

function runmysqlqueryfetch($query, $param_types = '', ...$params)
{
	global $newconnection;

	// Prepare the query
	$stmt = mysqli_prepare($newconnection, $query);
	if ($stmt === false) {
		die("MySQLi prepare error: " . mysqli_error($newconnection));
	}

	// Bind parameters if provided
	if (!empty($param_types)) {
		mysqli_stmt_bind_param($stmt, $param_types, ...$params);
	}

	// Execute the query
	if (!mysqli_stmt_execute($stmt)) {
		die("Query execution failed: " . mysqli_error($newconnection));
	}

	// Get the result
	$result = mysqli_stmt_get_result($stmt);
	if ($result === false) {
		die("Failed to get result: " . mysqli_error($newconnection));
	}

	// Fetch the query result as an associative array
	$fetchresult = mysqli_fetch_assoc($result);
	if ($fetchresult === false) {
		die("Cannot fetch the query result.");
	}

	// Close the statement
	mysqli_stmt_close($stmt);

	// Return the result
	return $fetchresult;
}




// function runmysqlqueryfetch($query)
// {
// 	global $newconnection;
// 	$dbname = 'relyon_lms';

// 	//Connect to Database
// 	mysqli_select_db($newconnection, $dbname) or die("Cannot connect to database");
// 	set_time_limit(3600);
// 	//Run the query
// 	$result = mysqli_query($newconnection, $query) or die(" run Query Failed in Runquery function1." . $query); //;

// 	//Fetch the Query to an array
// 	$fetchresult = mysqli_fetch_array($result) or die("Cannot fetch the query result." . $query);

// 	//Return the result
// 	return $fetchresult;
// }



/* -------------------- Run a query to log database with fetching from SELECT operation -------------------- */
function runmysqlqueryfetch_log($query)
{
	global $newconnection_log;
	$dbname_log = 'relyon_lms';

	//Connect to Database
	mysqli_select_db($newconnection_log, $dbname_log) or die("Cannot connect to database");
	set_time_limit(3600);
	//Run the query
	$result = mysqli_query($newconnection_log, $query) or die(" run Query Failed in Runquery function1." . $query); //;

	//Fetch the Query to an array
	$fetchresult = mysqli_fetch_array($result) or die("Cannot fetch the query result." . $query);

	//Return the result
	return $fetchresult;
}


/* -------------------- To change the date format from DD-MM-YYYY to YYYY-MM-DD or reverse -------------------- */
function changedateformat($date)
{
	if ($date <> "0000-00-00" && $date <> "00-00-0000" && $date <> "") {
		$result = explode("-", $date);
		$date = $result[2] . "-" . $result[1] . "-" . $result[0];
	} else {
		$date = "";
	}
	return $date;
}

function checkdateformat($date) //Valid is 2008-11-15
{
	$returnflag = false;
	$result = explode("-", $date);
	if (count($result) == 3 && checkdate($result[1], $result[2], $result[0]))
		$returnflag = true;
	return $returnflag;
}

function datenumeric($date) //convert date to its numeric value so that it can be compared.
{
	$dateArr = explode("-", $date);
	$dateInt = mktime(0, 0, 0, $dateArr[1], $dateArr[2], $dateArr[0]);
	return $dateInt;
}

/* -------------------- To trim the data for the grid, If it is more than 20 charecters [Say: "This problem is due to the problem in server" -> "This problem is due ..." -------------------- */
function gridtrim30($value)
{
	$desiredlength = 30;
	$length = strlen($value);
	if ($length >= $desiredlength) {
		$value = substr($value, 0, $desiredlength);
		$value .= "...";
	}
	return $value;
}

function gridtrim1($value)
{
	$desiredlength = 20;
	$length = strlen($value);
	if ($length >= $desiredlength) {
		$value = substr($value, 0, $desiredlength);
		$value .= "<br>";
	}
	return $value;
}

function nozerotime($time)
{
	if ($time == "00:00:00") {
		$time = "";
	}
	return $time;
}

function generatepwd()
{
	$charecterset = "1234567890";
	for ($i = 0; $i < 8; $i++) {
		$usrpassword .= $charecterset[mt_rand(0, 9)];
	}
	return $usrpassword;
}

function checkemailaddress($email)
{
	// First, we check that there's one @ symbol, and that the lengths are right
	if (!preg_match("/^[^@]{1,64}@[^@]{1,255}$/", $email)) {
		// Email invalid because wrong number of characters in one section, or wrong number of @ symbols.
		return false;
	}
	// Split it into sections to make life easier
	$email_array = explode("@", $email);
	$local_array = explode(".", $email_array[0]);
	for ($i = 0; $i < sizeof($local_array); $i++) {
		if (!preg_match("/^(([A-Za-z0-9!#$%&'*+\/=?^_`{|}~-][A-Za-z0-9!#$%&'*+\/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$/", $local_array[$i])) {
			return false;
		}
	}
	if (!preg_match("/^\[?[0-9\.]+\]?$/", $email_array[1])) {
		// Check if domain is IP. If not, it should be valid domain name
		$domain_array = explode(".", $email_array[1]);
		if (sizeof($domain_array) < 2) {
			return false; // Not enough parts to domain
		}
		for ($i = 0; $i < sizeof($domain_array); $i++) {
			if (!preg_match("/^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$/", $domain_array[$i])) {
				return false;
			}
		}
	}
	return true;
}

function replacemailvariable($content, $array)
{
	while ($item = current($array)) {
		if ($item == "")
			$item = "-";
		$content = str_replace(key($array), $item, $content);
		next($array);
	}
	return $content;
}

function fullurl()
{
	$s = (empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on")) ? "s" : "";
	$protocol = substr(strtolower($_SERVER["SERVER_PROTOCOL"]), 0, strpos(strtolower($_SERVER["SERVER_PROTOCOL"]), "/")) . $s;
	$port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":" . $_SERVER["SERVER_PORT"]);
	return $protocol . "://" . $_SERVER['SERVER_NAME'] . $port . $_SERVER['REQUEST_URI'];
}


function getuserdisplayname($userid)
{
	if ($userid == '') {
		$lastupdatedbyname = 'Web Downloaded';
		return $lastupdatedbyname;
	} else {
		$query3 = "select * from lms_users where id = '" . $userid . "'";
		$result3 = runmysqlqueryfetch($query3);
		switch ($result3['type']) {
			case "Admin":
				$lastupdatedbyname = "Admin";
				break;
			case "Sub Admin":
				$query4 = "SELECT * FROM lms_subadmins WHERE id = '" . $result3['referenceid'] . "'";
				$result4 = runmysqlqueryfetch($query4);
				$lastupdatedbyname = $result4['sadname'] . " [S]";
				break;
			case "Reporting Authority":
				$query4 = "SELECT * FROM lms_managers WHERE id = '" . $result3['referenceid'] . "'";
				$result4 = runmysqlqueryfetch($query4);
				$lastupdatedbyname = $result4['mgrname'] . " [M]";
				break;
			case "Dealer":
				$query4 = "SELECT * FROM dealers WHERE id = '" . $result3['referenceid'] . "'";
				$result4 = runmysqlqueryfetch($query4);
				$lastupdatedbyname = $result4['dlrcompanyname'] . " [D]";
				break;
			case "Implementer":
				$query4 = "SELECT * FROM lms_implementers WHERE id = '" . $result3['referenceid'] . "'";
				$result4 = runmysqlqueryfetch($query4);
				$lastupdatedbyname = $result4['impname'] . " [I]";
				break;
			case "Dealer Member":
				$query4 = "SELECT * FROM lms_dlrmembers WHERE dlrmbrid = '" . $result3['referenceid'] . "'";
				$result4 = runmysqlqueryfetch($query4);
				$lastupdatedbyname = $result4['dlrmbrname'] . " [DM]";
				break;
		}
		return $lastupdatedbyname;
	}
}

function sendsms($servicename, $tonumber, $smstext, $senddate, $sendtime)
{
	if (validatecellno($tonumber) == false)
		return false;
	else {

		/*$senddate = datetimelocal("Y-m-d"); $sendtime = datetimelocal("H:i"); $accountid = "20010262"; $accountpassword = "fcmy7q"; $tonumber = (strlen($tonumber) == 10)?$tonumber:substr($tonumber, -10); $smstext = substr($smstext, 0, 159); $targeturl = "http://www.mysmsmantra.co.in/sendurl.asp?"; $targeturl .= "user=".$accountid; $targeturl .= "&pwd=".$accountpassword; $targeturl .= "&senderid=RELYON"; $targeturl .= "&mobileno=".$tonumber; $targeturl .= "&msgtext=".urlencode($smstext); $targeturl .= "&priority=High"; $response = file_get_contents($targeturl); $splitdata = explode(",",$response); $messageid = $splitdata[0]; $message = "Sent Successfully. [Message ID = ".$messageid."]";*/ //Insert to SMS Logs Database

		$query = "insert into `smslogs`(servicename, tonumber, smstext, senddate, sendtime)values('" . $servicename . "', '" . $tonumber . "', '" . $smstext . "', '" . $senddate . "', '" . $sendtime . "')";
		$result = runmysqlquery($query);
		return true;
	}
}


// SMS function to send Single SMS and Bulk SMS
function sendsmsforleads($servicename, $tonumber, $smstext, $senddate, $sendtime, $leadid, $sentby)
{

	if (validatecellno($tonumber) == false) {
		return true;
	} else {
		/*$senddate = datetimelocal("Y-m-d"); $sendtime = datetimelocal("H:i"); $accountid = "20010262"; $accountpassword = "fcmy7q"; $tonumber = (strlen($tonumber) == 10)?$tonumber:substr($tonumber, -10); $smstext = substr($smstext, 0, 159); $targeturl = "http://www.mysmsmantra.co.in/sendurl.asp?"; $targeturl .= "user=".$accountid; $targeturl .= "&pwd=".$accountpassword; $targeturl .= "&senderid=RELYON"; $targeturl .= "&mobileno=".$tonumber; $targeturl .= "&msgtext=".urlencode($smstext); $targeturl .= "&priority=High"; $response = file_get_contents($targeturl); $splitdata = explode(",",$response); $messageid = $splitdata[0]; $message = "Sent Successfully. [Message ID = ".$messageid."]";*/ /* $file = $_SERVER['DOCUMENT_ROOT'].'/LMS/filescreated/'.'SMS.txt'; $current = stripslashes($smstext)."\r\n"; $fp = fopen($file,'a+'); if($fp) fwrite($fp,$current); fclose($fp); //echo('here');exit;*/ //Insert to SMS Logs Database
		$query = "insert into `smslogs`(servicename, tonumber, smstext, senddate, sendtime,leadid,smssentby)values('" . $servicename . "', '" . $tonumber . "', '" . addslashes($smstext) . "', '" . $senddate . "', '" . $sendtime . "','" . $leadid . "','" . $sentby . "')";
		$result = runmysqlquery($query);
		return true;
	}
}




function sendsmsnew($smsslno, $requestid, $smsnumber, $smstext, $smsfromname, $accounttype, $servicename)
{
	//Define acocunt info
	$accountid = "relyon";
	$accountpassword = "smssoftware";
	$smsfromname = "RSL-LMS";
	//Check the number to be of 10 digits. Else remove preceeding '91'
	$smsnumber = (strlen($smsnumber) == 10) ? $smsnumber : substr($smsnumber, -10);

	//Build API URL
	$targeturl = "http://hapi.smsapi.org/SendSMS.aspx?";
	$targeturl .= "UserName=" . $accountid;
	$targeturl .= "&password=" . $accountpassword;
	$targeturl .= "&MobileNo=91" . $smsnumber;
	$targeturl .= "&SenderID=" . $smsfromname;
	$targeturl .= "&Message=" . urlencode($smstext);

	//Open API URL and get the response message
	$providermessage = file_get_contents($targeturl);

	//Get Provider's message ID
	$explodedresponse = explode('"', $providermessage);
	$providermessageid = $explodedresponse[1];

	//Insert SMS logs
	$query = "insert into `smslogs`(servicename, tonumber, smstext, senddate, sendtime)values('" . $servicename . "', '" . $tonumber . "', '" . $smstext . "', '" . $senddate . "', '" . $sendtime . "')";
	$result = runmysqlquery($query);

	return true;
}


function validatecellno($tonumber)
{
	if ((!preg_match('/^9\d{9}$/', $tonumber)) && (!preg_match('/^919\d{9}$/', $tonumber)) && (!preg_match('/^7\d{9}$/', $tonumber)) && (!preg_match('/^917\d{9}$/', $tonumber)) && (!preg_match('/^8\d{9}$/', $tonumber)) && (!preg_match('/^918\d{9}$/', $tonumber))) {
		return false;
	} else {
		return true;
	}
}

function changedateformatwithtime($date)
{
	if ($date <> "0000-00-00 00:00:00") {
		if (strpos($date, " ")) {
			$result = explode(" ", $date);
			if (strpos($result[0], "-"))
				$dateonly = explode("-", $result[0]);
			$timeonly = explode(":", $result[1]);
			$timeonlyhm = $timeonly[0] . ':' . $timeonly[1];
			$date = $dateonly[2] . "-" . $dateonly[1] . "-" . $dateonly[0] . " " . '(' . $timeonlyhm . ')';
		}

	} else {
		$date = "";
	}
	return $date;
}

// function to create cookie and encoded the cookie name and value
function lmscreatecookie($cookiename, $cookievalue)
{

	//Define prefix and suffix 
	$prefixstring = "AxtIv23";
	$suffixstring = "StPxZ46";
	$stringsuff = "55";

	//Append Value with the Prefix and Suffix
	$Appendvalue = $prefixstring . $cookievalue . $suffixstring;

	// Convert the Appended Value to base64
	$Encodevalue = encodevalue($Appendvalue);

	//Convert Cookie Name to base64
	$Encodename = encodevalue($cookiename);

	//Create a cookie with the encoded name and value
	setcookie($Encodename, $Encodevalue, time() + 2592000);

	//Convert Appended encode value to MD5
	$rescookievalue = md5($Encodevalue);

	//Appended the encoded cookie name with 55(suffix )
	$rescookiename = $Encodename . $stringsuff;

	//Create a cookie
	setcookie($rescookiename, $rescookievalue, time() + 2592000);
	return false;

}


// function to delete cookie and encoded the cookie name and value
function lmsdeletecookie($cookiename)
{
	//Name Suffix for MD5 value
	$stringsuff = "55";

	//Convert Cookie Name to base64
	$Encodename = encodevalue($cookiename);
	//Append the encoded cookie name with 55(suffix ) for MD5 value
	$rescookiename = $Encodename . $stringsuff;

	//Set expiration to negative time, which will delete the cookie
	setcookie($Encodename, "", time() - 3600);
	setcookie($rescookiename, "", time() - 3600);

	setcookie(session_name(), "", time() - 3600);
}

//Function to get cookie and encode it and validate
// function lmsgetcookie($cookiename)
// {

// 	$suff = "55";
// 	// Convert the Cookie Name to base64
// 	$Encodestr = encodevalue($cookiename);

// 	//Read cookie name
// 	$stringret = $_COOKIE[$Encodestr];
// 	$stringret = stripslashes($stringret);
// 	//Convert the read cookie name to md5 encode technique
// 	$Encodestring = md5($stringret);

// 	//Appended the encoded cookie name to 55(suffix)
// 	$resultstr = $Encodestr . $suff;
// 	$cookiemd5 = $_COOKIE[$resultstr];

// 	//Compare the encoded value wit the fetched cookie, if the condition is true decode the cookie value
// 	if ($Encodestring == $cookiemd5) {
// 		$decodevalue = decodevalue($stringret);
// 		//Remove the Prefix/Suffix Characters
// 		$string1 = substr($decodevalue, 7);
// 		$resultstring = substr($string1, 0, -7);
// 		return $resultstring;
// 	} else if (isset($Encodestring) == '') {
// 		return false;
// 	} else {
// 		return false;
// 	}

// }



function lmsgetcookie($cookiename)
{
	$suff = "55";
	// Convert the Cookie Name to base64
	$Encodestr = encodevalue($cookiename);

	// Read cookie name
	if (isset($_COOKIE[$Encodestr])) {
		$stringret = $_COOKIE[$Encodestr];
		if (!is_null($stringret)) {
			$stringret = stripslashes($stringret);
		}

		// Convert the read cookie name to md5 encode technique
		$Encodestring = md5($stringret);

		// Appended the encoded cookie name to 55(suffix)
		$resultstr = $Encodestr . $suff;

		if (isset($_COOKIE[$resultstr])) {
			$cookiemd5 = $_COOKIE[$resultstr];

			// Compare the encoded value with the fetched cookie, if the condition is true decode the cookie value
			if ($Encodestring == $cookiemd5) {
				$decodevalue = decodevalue($stringret);
				// Remove the Prefix/Suffix Characters
				$string1 = substr($decodevalue, 7);
				$resultstring = substr($string1, 0, -7);
				return $resultstring;
			} else {
				// Handle the case where cookies don't match
				return false;
			}
		} else {
			// Handle the case where the resultstr cookie key is not set
			return false;
		}
	} else {
		// Handle the case where the Encodestr cookie key is not set
		return false;
	}
}





//Function to logout (clear cookies)
function lmsuserlogout()
{
	session_start();
	session_unset();
	session_destroy();
	lmsdeletecookie('sessionkind');
	lmsdeletecookie('applicationid');
	lmsdeletecookie('lmsusername');
	lmsdeletecookie('lmsusertype');
	lmsdeletecookie('lmslastlogindate');

}

function lmsuserlogoutredirect()
{
	lmsuserlogout();
	$url = "../index.php?link=" . fullurl();
	header("Location:" . $url);
	exit();
}


function encodevalue($input)
{
	$length = strlen($input);
	$output1 = "";
	for ($i = 0; $i < $length; $i++) {
		$output1 .= $input[$i];
		if ($i < ($length - 1))
			$output1 .= "a";
	}
	$output = "";
	for ($i = 0; $i < strlen($output1); $i++) {
		$output .= chr(ord($output1[$i]) + 7);
	}
	return $output;
}


function decodevalue($input)
{
	$input = str_replace('\\\\', '\\', $input);
	$input = str_replace("\\'", "'", $input);
	$length = strlen($input);
	$output = "";
	for ($i = 0; $i < $length; $i++) {
		if ($i % 2 == 0)
			$output .= chr(ord($input[$i]) - 7);
	}
	$output = str_replace("'", "\'", $output);
	return $output;
}

function replacemailvariablenew($content, $array)
{
	$arraylength = count($array);
	for ($i = 0; $i < $arraylength; $i++) {
		$splitvalue = explode('%^%', $array[$i]);
		$oldvalue = $splitvalue[0];
		$newvalue = $splitvalue[1];
		$content = str_replace($oldvalue, $newvalue, $content);
	}
	return $content;
}

//Function to delete the file 
function fileDelete($filepath, $filename)
{
	$success = FALSE;
	if (file_exists($filepath . $filename) && $filename != "" && $filename != "n/a") {
		unlink($filepath . $filename);
		$success = TRUE;
	}
	return $success;
}

function tooltiptextdetails($id)
{
	$query = "select * from lms_users where id = '" . $id . "'";
	$result = runmysqlqueryfetch($query);
	switch ($result['type']) {
		case "Admin":
			$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="2">';
			$table .= '<tr><td><strong>Name:</strong>Admin </td></tr></table>';
			break;
		case "Sub Admin":
			$query4 = "SELECT sadname,sademailid,cell FROM lms_subadmins WHERE id = '" . $result['referenceid'] . "'";
			$fetch = runmysqlqueryfetch($query4);
			if ($fetch['cell'] <> '') {
				$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="0">';
				$table .= '<tr><td><strong>Name:</strong> ' . $fetch['sadname'] . ' [S]</td></tr>';
				$table .= '<tr><td><strong>Cell:</strong> ' . $fetch['cell'] . '</td></tr>';
				$table .= '<tr><td><strong>EmailId:</strong> ' . $fetch['sademailid'] . '</td></tr>';
				$table .= '</table>';
			} else {
				$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="0">';
				$table .= '<tr><td><strong>Name:</strong> ' . $fetch['sadname'] . ' [S]</td></tr>';
				$table .= '<tr><td><strong>EmailId:</strong> ' . $fetch['sademailid'] . '</td></tr>';
				$table .= '</table>';
			}
			break;
		case "Reporting Authority":
			$query4 = "SELECT mgrname,mgrlocation,mgrcell,mgremailid FROM lms_managers WHERE id = '" . $result['referenceid'] . "'";
			$fetch = runmysqlqueryfetch($query4);
			$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="0">';
			$table .= '<tr><td><strong>Name:</strong> ' . $fetch['mgrname'] . ' [M]</td></tr>';
			$table .= '<tr><td><strong>District:</strong> ' . $fetch['mgrlocation'] . '</td></tr>';
			$table .= '<tr><td><strong>Cell:</strong> ' . $fetch['mgrcell'] . '</td></tr>';
			$table .= '<tr><td><strong>Email Id:</strong> ' . $fetch['mgremailid'] . '</td></tr>';
			$table .= '</table>';
			break;
		case "Dealer":
			$query4 = "SELECT dlrcompanyname,dlrname,district,state,dlrcell,dlrphone,dlremail FROM dealers WHERE id = '" . $result['referenceid'] . "'";
			$fetch = runmysqlqueryfetch($query4);
			$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="0">';
			$table .= '<tr><td ><strong>Company:</strong> ' . $fetch['dlrcompanyname'] . '</td></tr>';
			$table .= '<tr><td ><strong>Contact Person:</strong> ' . $fetch['dlrname'] . '</td></tr>';
			$table .= '<tr><td ><strong>Place:</strong>' . $fetch['district'] . ',' . $fetch['state'] . '</td></tr>';
			$table .= '<tr><td ><strong>Phone:</strong> ' . $fetch['dlrphone'] . '</td></tr>';
			$table .= '<tr><td ><strong>Cell:</strong> ' . $fetch['dlrcell'] . '</td></tr>';
			$table .= '<tr><td><strong>Email Id:</strong> ' . $fetch['dlremail'] . '</td></tr>';
			$table .= '</table>';
			break;

		case "Dealer Member":
			$query4 = "SELECT *,dealers.dlrcompanyname from lms_dlrmembers left join dealers on dealers.id = lms_dlrmembers.dealerid where dlrmbrid = '" . $result['referenceid'] . "'";
			$fetch = runmysqlqueryfetch($query4);
			$table = '<table width="100%" border="0"  cellspacing="0" cellpadding="0">';
			$table .= '<tr><td ><strong>Name:</strong> ' . $fetch['dlrmbrname'] . '</td></tr>';
			$table .= '<tr><td ><strong>Dealer Company:</strong> ' . $fetch['dlrcompanyname'] . '</td></tr>';
			$table .= '<tr><td ><strong>Cell:</strong>' . $fetch['dlrmbrcell'] . '</td></tr>';
			$table .= '<tr><td><strong>Email Id:</strong> ' . $fetch['dlrmbremailid'] . '</td></tr>';
			$table .= '</table>';
			break;
	}
	return $table;
}

// Function to display amount in Indian Format (Eg:123456 : 1,23,456)

function formatnumber($number)
{
	if (is_numeric($number)) {
		$numbersign = "";
		$numberdecimals = "";

		//Retain the number sign, if present
		if (substr($number, 0, 1) == "-" || substr($number, 0, 1) == "+") {
			$numbersign = substr($number, 0, 1);
			$number = substr($number, 1);
		}

		//Retain the decimal places, if present
		if (strpos($number, '.')) {
			$position = strpos($number, '.'); //echo($position.'<br/>');
			$numberdecimals = substr($number, $position); //echo($numberdecimals.'<br/>');
			$number = substr($number, 0, ($position)); //echo($number.'<br/>');
		}

		//Apply commas
		if (strlen($number) < 4) {
			$output = $number;
		} else {
			$lastthreedigits = substr($number, -3);
			$remainingdigits = substr($number, 0, -3);
			$tempstring = "";
			for ($i = strlen($remainingdigits), $j = 1; $i > 0; $i--, $j++) {
				if ($j % 2 <> 0)
					$tempstring = ',' . $tempstring;
				$tempstring = $remainingdigits[$i - 1] . $tempstring;
			}
			$output = $tempstring . $lastthreedigits;
		}
		$finaloutput = $numbersign . $output . $numberdecimals;
		return $finaloutput;
	} else {
		$finaloutput = 0;
		return $finaloutput;
	}
}
function getshowmcapermissionvalue()
{
	//Check who is making the entry
	$cookie_username = lmsgetcookie('lmsusername');
	$query = "select * from lms_users where lms_users.username = '" . $cookie_username . "'";
	$result = runmysqlqueryfetch($query);
	$enteredbyuserid = $result['id'];
	$referenceid = $result['referenceid'];
	$cookie_usertype = lmsgetcookie('lmsusersort');

	switch ($cookie_usertype) {
		case 'Dealer': {
			$query = "select showmcacompanies,branch from dealers where id = '" . $referenceid . "';";
			$resultfetch = runmysqlqueryfetch($query);
			$showmcacompanies = $resultfetch['showmcacompanies'];
			$branch = $resultfetch['branch'];
		}
			break;
		case 'Sub Admin': {
			$query = "select showmcacompanies from lms_subadmins where id = '" . $referenceid . "';";
			$resultfetch = runmysqlqueryfetch($query);
			$branch = '';
			$showmcacompanies = $resultfetch['showmcacompanies'];
		}
			break;
		case 'Reporting Authority': {
			$query = "select showmcacompanies,branch from lms_managers where id = '" . $referenceid . "';";
			$resultfetch = runmysqlqueryfetch($query);
			$showmcacompanies = $resultfetch['showmcacompanies'];
			$branch = $resultfetch['branch'];
		}
			break;
		case 'Admin': {
			$showmcacompanies = 'yes';
		}
			break;
	}
	return $showmcacompanies . '^' . $branch . '^' . $query;
}

function isvalidhostname()
{
	if ($_SERVER['HTTP_HOST'] == 'rashmihk' || $_SERVER['HTTP_HOST'] == 'meghanab1' || $_SERVER['HTTP_HOST'] == 'vijaykumar' || $_SERVER['HTTP_HOST'] == 'dealers.relyonsoft.com' || $_SERVER['HTTP_HOST'] == 'rwmserver')
		return true;
	else
		return false;
}

function isurl($url)
{
	return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
}


// function generate_pdf()
// {
// 	ini_set('memory_limit', '2048M');

// 	require ('../pdfbillgeneration/tcpdf.php');

// 	$id = $_POST['id'];
// 	$contactperson = $_POST['contactperson'];
// 	$address = $_POST['address'];
// 	$stdcode = $_POST['stdcode'];
// 	$phone = $_POST['phone'];
// 	$cell = $_POST['cell'];
// 	$emailid = $_POST['emailid'];
// 	$gstin = $_POST['gstin'];
// 	$remarks = $_POST['remarks'];
// 	$productNames = explode(',', $_POST['productnames']);
// 	$purchaseTypes = explode(',', $_POST['purchasetypes']);
// 	$usageTypes = explode(',', $_POST['usagetypes']);
// 	$amounts = explode(',', $_POST['amounts']);

// 	// Sanitize input
// 	$leadid = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
// 	$gstin = filter_input(INPUT_POST, 'gstin', FILTER_SANITIZE_STRING);
// 	$remarks = filter_input(INPUT_POST, 'remarks', FILTER_SANITIZE_STRING);

// 	$quoteQuery = "SELECT * FROM lms_quote ORDER BY id DESC LIMIT 1";
// 	$quoteResult = runmysqlqueryfetch($quoteQuery);
// 	$leadid = $quoteResult['leadid'];


// 	// Fetch lead details from database
// 	$leadQuery = "SELECT * FROM leads WHERE id = '$leadid'";
// 	$leadResult = runmysqlqueryfetch($leadQuery);
// 	if (!$leadResult) {
// 		die('Lead not found');
// 	}

// 	// Fetch dealer details from database
// 	$dealerid = $leadResult['dealerid'];
// 	$dealerQuery = "SELECT `dlrname`, `dlrcell`, `dlremail` FROM dealers WHERE id = '$dealerid'";
// 	$dealerResult = runmysqlqueryfetch($dealerQuery);
// 	if (!$dealerResult) {
// 		die('Dealer not found');
// 	}
// 	// Generate quote details
// 	$quotedate = date("d-m-Y");
// 	$year = date("Y");
// 	$autoIncrementValue = $quoteResult['id'] + 1;
// 	$quotenumber = "RSL" . $year . "Q" . str_pad($autoIncrementValue, 2, "0", STR_PAD_LEFT);
// 	$validdate = date("d-m-Y", strtotime("+14 days"));
// 	$company = $leadResult['company'];
// 	$emailid = $leadResult['emailid'];
// 	$customername = $leadResult['name'];
// 	$cell = $leadResult['cell'];
// 	$address = $leadResult['address'];
// 	$extvname = $dealerResult['dlrname'];
// 	$extvcell = $dealerResult['dlrcell'];
// 	$extvemailid = $dealerResult['dlremail'];

// 	// Prepare product rows
// 	$products = json_decode($_POST['products'], true);
// 	$productRows = '';
// 	foreach ($products as $index => $product) {
// 		$productRows .= "<tr>
//                     <td>" . ($index + 1) . "</td>
//                     <td>{$product['productName']}</td>
//                     <td>{$product['purchaseType']}</td>
//                     <td>{$product['usageType']}</td>
//                     <td>" . number_format($product['amount'], 2) . "</td>
//                 </tr>";
// 	}

// 	// Load template file
// 	$template = file_get_contents('../pdfbillgeneration/template.php');

// 	// Replace placeholders with actual data
// 	$template = str_replace('##quotedate##', $quotedate, $template);
// 	$template = str_replace('##gstin##', $gstin, $template);
// 	$template = str_replace('##quotenumber##', $quotenumber, $template);
// 	$template = str_replace('##validdate##', $validdate, $template);
// 	$template = str_replace('##company##', $company, $template);
// 	$template = str_replace('##emailid##', $emailid, $template);
// 	$template = str_replace('##customername##', $customername, $template);
// 	$template = str_replace('##cell##', $cell, $template);
// 	$template = str_replace('##address##', $address, $template);
// 	$template = str_replace('##extvname##', $extvname, $template);
// 	$template = str_replace('##extvcell##', $extvcell, $template);
// 	$template = str_replace('##extvemailid##', $extvemailid, $template);
// 	$template = str_replace('##productRows##', $productRows, $template);

// 	// Create TCPDF instance
// 	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// 	$pdf->SetCreator(PDF_CREATOR);
// 	$pdf->SetAuthor('Your Name');
// 	$pdf->SetTitle('Generated PDF');
// 	$pdf->SetSubject('Form Data');
// 	$pdf->SetKeywords('TCPDF, PDF, form, data');

// 	// Add a page
// 	$pdf->AddPage();

// 	// Write the HTML content
// 	$pdf->writeHTML($template, true, false, true, false, '');

// 	// Output the PDF (force download)
// 	$pdf->Output('generated_pdf.pdf', 'I');
// }



// function generate_pdf()
// {
// 	ini_set('memory_limit', '2048M');
// 	require ('../pdfbillgeneration/tcpdf.php');

// 	// Sanitize input
// 	$leadid = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
// 	$gstin = filter_input(INPUT_POST, 'gstin', FILTER_SANITIZE_STRING);
// 	$remarks = filter_input(INPUT_POST, 'remarks', FILTER_SANITIZE_STRING);


// 	$id = $_POST['id'];
// 	$contactperson = $_POST['contactperson'];
// 	$address = $_POST['address'];
// 	$stdcode = $_POST['stdcode'];
// 	$phone = $_POST['phone'];
// 	$cell = $_POST['cell'];
// 	$emailid = $_POST['emailid'];
// 	$gstin = $_POST['gstin'];
// 	$remarks = $_POST['remarks'];

// 	// Fetch lead details from database
// 	$leadQuery = "SELECT * FROM leads WHERE id = '$leadid'";
// 	$leadResult = runmysqlqueryfetch($leadQuery);
// 	if (!$leadResult) {
// 		die('Lead not found');
// 	}

// 	// Fetch dealer details from database
// 	$dealerid = $leadResult['dealerid'];
// 	$dealerQuery = "SELECT `dlrname`, `dlrcell`, `dlremail` FROM dealers WHERE id = '$dealerid'";
// 	$dealerResult = runmysqlqueryfetch($dealerQuery);
// 	if (!$dealerResult) {
// 		die('Dealer not found');
// 	}

// 	// Generate quote details
// 	$quotedate = date("d-m-Y");
// 	$year = date("Y");
// 	$quotenumber = "RSL" . $year . "Q" . str_pad($quoteResult['id'] + 1, 2, "0", STR_PAD_LEFT);
// 	$validdate = date("d-m-Y", strtotime("+14 days"));
// 	$company = $leadResult['company'];
// 	$emailid = $leadResult['emailid'];
// 	$customername = $leadResult['name'];
// 	$cell = $leadResult['cell'];
// 	$address = $leadResult['address'];
// 	$extvname = $dealerResult['dlrname'];
// 	$extvcell = $dealerResult['dlrcell'];
// 	$extvemailid = $dealerResult['dlremail'];
// 	// Fetch product details from lms_quote
// 	$productQuery = "SELECT `productname`, `purchasetype`, `usagetype`, `amount` FROM lms_quote WHERE id = '{$quoteResult['id']}'";
// 	$productResult = runmysqlqueryfetch($productQuery);
// 	if (!$productResult) {
// 		die('Product details not found');
// 	}

// 	$productNames = explode(',', $productResult['productname']);
// 	$purchaseTypes = explode(',', $productResult['purchasetype']);
// 	$usageTypes = explode(',', $productResult['usagetype']);
// 	$amounts = explode(',', $productResult['amount']);


// 	$productRows .= "<tr style='background-color: #CCCCCC;' margin-left:10px;>
//     <td width='30%' colspan='3'>
//         <div align='center'><strong>SL No</strong></div>
//     </td>
//     <td width='40%' colspan='3'>
//         <div align='center'><strong>Description</strong></div>
//     </td>
//     <td width='30%' colspan='3'>
//         <div align='center'><strong>Amount</strong></div>
//     </td>
// </tr>";

// for ($i = 0; $i < count($productNames); $i++) {
//     $productRows .= "<tr>
//         <td colspan='3'>" . ($i + 1) . "</td>
//         <td colspan='3'>{$productNames[$i]}, {$purchaseTypes[$i]}, {$usageTypes[$i]}</td>
//         <td colspan='3'>" . number_format($amounts[$i], 2) . "</td>
//     </tr>";
// }


// 	// Load template file
// 	$template = file_get_contents('../pdfbillgeneration/template.php');

// 	// Replace placeholders with actual data
// 	$template = str_replace('##quotedate##', $quotedate, $template);
// 	$template = str_replace('##gstin##', $gstin, $template);
// 	$template = str_replace('##quotenumber##', $quotenumber, $template);
// 	$template = str_replace('##validdate##', $validdate, $template);
// 	$template = str_replace('##company##', $company, $template);
// 	$template = str_replace('##emailid##', $emailid, $template);
// 	$template = str_replace('##customername##', $customername, $template);
// 	$template = str_replace('##cell##', $cell, $template);
// 	$template = str_replace('##address##', $address, $template);
// 	$template = str_replace('##extvname##', $extvname, $template);
// 	$template = str_replace('##extvcell##', $extvcell, $template);
// 	$template = str_replace('##extvemailid##', $extvemailid, $template);
// 	$template = str_replace('##productRows##', $productRows, $template);

// 	// Create TCPDF instance
// 	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// 	$pdf->SetCreator(PDF_CREATOR);
// 	$pdf->SetAuthor('Your Name');
// 	$pdf->SetTitle('Generated PDF');
// 	$pdf->SetSubject('Form Data');
// 	$pdf->SetKeywords('TCPDF, PDF, form, data');

// 	// Add a page
// 	$pdf->AddPage();

// 	// Write the HTML content
// 	$pdf->writeHTML($template, true, false, true, false, '');

// 	// Output the PDF (force download)
// 	$pdf->Output('generated_pdf.pdf', 'I');

// }


// function generate_pdf()
// {
// 	ini_set('memory_limit', '2048M');
// 	require ('../pdfbillgeneration/tcpdf.php');

// 	// Sanitize input (you can remove this part if you're already sanitizing inputs before calling this function)
// 	$leadid = filter_var($id, FILTER_SANITIZE_NUMBER_INT);
// 	$gstin = filter_var($gstin, FILTER_SANITIZE_STRING);
// 	$remarks = filter_var($remarks, FILTER_SANITIZE_STRING);



// 	 echo $leadid;
// 	// Fetch lead details from database
// 	$leadQuery = "SELECT * FROM leads WHERE id = '$leadid'";
// 	$leadResult = runmysqlqueryfetch($leadQuery);
// 	if (!$leadResult) {
// 		die('Lead not found');
// 	}

// 	// Fetch dealer details from database
// 	$dealerid = $leadResult['dealerid'];
// 	$dealerQuery = "SELECT `dlrname`, `dlrcell`, `dlremail` FROM dealers WHERE id = '$dealerid'";
// 	$dealerResult = runmysqlqueryfetch($dealerQuery);
// 	if (!$dealerResult) {
// 		die('Dealer not found');
// 	}

// 	// Generate quote details
// 	$quotedate = date("d-m-Y");
// 	$year = date("Y");
// 	$quotenumber = "RSL" . $year . "Q" . str_pad($quoteResult['id'] + 1, 2, "0", STR_PAD_LEFT);
// 	$validdate = date("d-m-Y", strtotime("+14 days"));
// 	$company = $leadResult['company'];
// 	$emailid = $leadResult['emailid'];
// 	$customername = $leadResult['name'];
// 	$cell = $leadResult['cell'];
// 	$address = $leadResult['address'];
// 	$extvname = $dealerResult['dlrname'];
// 	$extvcell = $dealerResult['dlrcell'];
// 	$extvemailid = $dealerResult['dlremail'];
// 	// Fetch product details from lms_quote
// 	$productNames = $productName;
// 	$purchaseTypes = $purchaseType;
// 	$usageTypes = $usageType;
// 	$amounts = $amount;

// 	$productRows = "";
// 	$productRows .= "<tr style='background-color: #CCCCCC;'>
//         <td><strong>SL No</strong></td>
//         <td><strong>Description</strong></td>
//         <td><strong>Amount</strong></td>
//     </tr>";

// 	for ($i = 0; $i < count($productNames); $i++) {
// 		$productRows .= "<tr>
//             <td>" . ($i + 1) . "</td>
//             <td>{$productNames[$i]}, {$purchaseTypes[$i]}, {$usageTypes[$i]}</td>
//             <td>" . number_format($amounts[$i], 2) . "</td>
//         </tr>";
// 	}

// 	// Load template file
// 	$template = file_get_contents('../pdfbillgeneration/template.php');

// 	// Replace placeholders with actual data
// 	$template = str_replace('##quotedate##', $quotedate, $template);
// 	$template = str_replace('##gstin##', $gstin, $template);
// 	$template = str_replace('##quotenumber##', $quotenumber, $template);
// 	$template = str_replace('##validdate##', $validdate, $template);
// 	$template = str_replace('##company##', $company, $template);
// 	$template = str_replace('##emailid##', $emailid, $template);
// 	$template = str_replace('##customername##', $customername, $template);
// 	$template = str_replace('##cell##', $cell, $template);
// 	$template = str_replace('##address##', $address, $template);
// 	$template = str_replace('##extvname##', $extvname, $template);
// 	$template = str_replace('##extvcell##', $extvcell, $template);
// 	$template = str_replace('##extvemailid##', $extvemailid, $template);
// 	$template = str_replace('##productRows##', $productRows, $template);

// 	// Create TCPDF instance
// 	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// 	$pdf->SetCreator(PDF_CREATOR);
// 	$pdf->SetAuthor('Your Name');
// 	$pdf->SetTitle('Generated PDF');
// 	$pdf->SetSubject('Form Data');
// 	$pdf->SetKeywords('TCPDF, PDF, form, data');

// 	// Add a page
// 	$pdf->AddPage();

// 	// Write the HTML content
// 	$pdf->writeHTML($template, true, false, true, false, '');

// 	// Output the PDF (force download)
// 	$pdf->Output('generated_pdf.pdf', 'I');
// }


if (empty($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}




?>