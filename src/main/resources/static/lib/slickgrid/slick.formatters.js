/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Formatters": {
        "PercentComplete": PercentCompleteFormatter,
        "PercentCompleteBar": PercentCompleteBarFormatter,
        "YesNo": YesNoFormatter,
        "Checkmark": CheckmarkFormatter,
          "SelfObject":SelfObjectFormatter,
          "SelfDate":SelfDateFormatter,
          "SelfDefault":SelfDefaultFormatter,
          "SelfArray":SelfArrayFormatter,
          "SelfPointer":SelfPointerFormatter,
          "SelfAcl":SelfAclFormatter,
          "SelfString":SelfStringFormatter,
          "SelfNumber":SelfNumberFormatter,
          "SelfIdString":SelfIdStringFormatter,
          "SelfFile":SelfFileFormatter

      }
    }
  });

    function SelfFileFormatter(row, cell, value, columnDef, dataContext) {

        var tempH='<div onclick="alert(1)">sss</div>';

        return tempH;
    }
    function SelfIdStringFormatter(row, cell, value, columnDef, dataContext) {
        return value;
    }



    function SelfNumberFormatter(row, cell, value, columnDef, dataContext) {
        var tempValue="";
        if($.type(value)==="number")
        {
            tempValue=value;
        }

        return tempValue;
    }
    function SelfStringFormatter(row, cell, value, columnDef, dataContext) {
        var tempValue="";
        if($.type(value)==="string")
        {
            tempValue=value;
        }

        return tempValue;
    }


    function SelfAclFormatter(row, cell, value, columnDef, dataContext) {

        var tempValue="";
        if($.type(value)==="object")
        {
            tempValue=JSON.stringify(value);
        }

        return tempValue;
    }



    function SelfPointerFormatter(row, cell, value, columnDef, dataContext) {


        var tempValue="";
        if($.type(value)==="object")
        {
            tempValue=value._id+":"+value.className;
        }

        return tempValue;
    }

    function SelfArrayFormatter(row, cell, value, columnDef, dataContext) {


        var tempValue="";
        if($.type(value)==="array")
        {
            tempValue=value.join(",");
            tempValue="["+tempValue+"]";

        }

        return tempValue;
    }

    function SelfObjectFormatter(row, cell, value, columnDef, dataContext) {
        if($.type(value)=="object")
        {
            return JSON.stringify(value);
        }
        else
        {
            return "";
        }

    }
    function SelfDefaultFormatter(row, cell, value, columnDef, dataContext) {
        return value;
    }
    function SelfDateFormatter(row, cell, value, columnDef, dataContext) {
        if(value)
        {
            return Util.Common.dateFormat(new Date(value));
        }
        else
        {
            return "";
        }
    }
  function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "-";
    } else if (value < 50) {
      return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    } else {
      return "<span style='color:green'>" + value + "%</span>";
    }
  }

  function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "";
    }

    var color;

    if (value < 30) {
      color = "red";
    } else if (value < 70) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
  }

  function YesNoFormatter(row, cell, value, columnDef, dataContext) {

    return value ? "Yes" : "No";
  }

  function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "<img src='../images/tick.png'>" : "";
  }
})(jQuery);
