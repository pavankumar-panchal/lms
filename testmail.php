<?php

 			$fromname = "Relyon";
            $fromemail = "imax@relyon.co.in";
            //require_once("httpdocs/freegstaccounting/inc/RSLMAIL_MAIL.php");
			require_once("includetest/RSLMAIL_MAIL.php");
            $msg = "Test Mail";
            $textmsg = 'Daily GST Download Reports';
       
		//$emailid = array('Kumar' => 'kumar.undodi@relyonsoft.com','Manjunath' => 				'manjunath.sm@relyonsoft.com','Mithun'=>'mithun.joshi@relyonsoft.com');
			$emailid = array('bhumika' => 'bhumika.p@relyonsoft.com');


        //Mail to customer
        $toarray = $emailid;

        //$bccarray = array('bhumika' => 'bhumika.p@relyonsoft.com');
		$array = array();
      	// $msg = replacemailvariable($msg,$array);
        //$textmsg = replacemailvariable($textmsg,$array);
        $subject = "Daily GST Download Reports";
        $html = $msg;
        $text = $textmsg;
        $replyto = "manjunath.sm@relyonsoft.com";
        rslmail($fromname, $fromemail, $toarray, $subject, $text,$html,$replyto);
?>