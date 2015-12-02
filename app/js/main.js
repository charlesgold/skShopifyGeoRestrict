/***
* JS plugin to allow blocking of visitors NOT 
* included in the preferred country list. 
*
* Utilizing https://freegeoip.net service.
*
* @author Charlie Topjian [charlietopjian@gmail.com]
* @version 1.0.0
* @license
* Copyright (c) 2015 Charlie Topjian
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
var cstShopifyGeoApp = {
	version: "1.0.0",
	initiate: function() {
		//callback in params if necessary
		//start watch
		if(this.settings.enabled){
			this.runApp();
		}
	}
	,runApp: function() {
		//visited?
		if(this.seenBefore()){			
			//blocked?
			if(this.checkBlock()){
				this.directVisitor();
			}
			//do nothing.
		} else { //not visited in 30days
			//setup visitor
			this.setup();
			//blk?			
		}
		
	}		
	,setup: function(){
		//set clientIp
		this.getGeoInfo();
		//chain starts due to callback
	}
	,seenBefore: function(){
		if(this.getCookie('shopifyGeoAppIp')!=''){
			return true;
		} else {
			return false;
		}		
	}
	,testVisit: function(){
		console.log(this.settings.countryCode);
		if(!this.searchDb(this.settings.countryCode)){
			this.setBlock();
			this.directVisitor();
		}
	}
	,setBlock: function(){
		this.setCookie('shopifyGeoAppBlock',1,365);
	}
	,checkBlock: function(){
		if(this.getCookie('shopifyGeoAppBlock')!=''){
			return true;
		} else {
			return false;	
		}
	}
	,getGeoInfo: function(){
		var _this = this;
		$.getJSON("https://freegeoip.net/json/", function(data){
			_this.settings.ip = data.ip;
			_this.settings.countryCode = data.country_code;	
			//we have to do this here
			//to allow for callback
			_this.setupGeoInfo();
		});
	}
	,setupGeoInfo: function(){

		this.setCookie('shopifyGeoAppIp',this.settings.ip,30);
		this.setCookie('shopifyGeoAppCountryCode',this.settings.countryCode,30);
		//test visit
		this.testVisit();		
	}	
	,searchDb: function(searchData) {
		this.focusSearch = searchData;
		var result = this.settings.db.indexOf(searchData);
		if(result != -1){
			return true; //found
		} else {
			return false; //not in dbase
		}
	}
	,verifyRule: function(data){
		//* @param data field object
		if(!this.searchDb(data)){
			
		} else {
			//sorry can't checkout msg

		}
	}
	,directVisitor: function(){
		window.location = atob(this.settings.redirectUrl);
	}
	,setCookie: function(e, t, n) {
		//cname, cvalue, exdays
	    if (n) {
	        var r = new Date;
	        r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
	        var i = "; expires=" + r.toGMTString()
	    } else var i = "";
	    document.cookie = this.settings.preFix + e + "=" + t + i + "; path=/;";

	}
	,getCookie: function(cname){
	    var name = this.settings.preFix + cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";		
	}
	,getIp: function(){
		//not used fallback for now.
		var _this = this;
		$.getJSON("http://jsonip.com?callback=?", function (data) {
		    if(_this.getCookie('_shopifyGeoAppIp') == ''){	    
		    	_this.setCookie('_shopifyGeoAppIp',data.ip,365);
		    	_this.settings.clientIp = data.ip;
			} else {
				_this.settings.clientIp = _this.getCookie('_shopifyGeoAppIp');
			}
		});			
	}	
	
};
//*Set on Server End
cstShopifyGeoApp.settings  				= {};
cstShopifyGeoApp.settings.preFix		= '_dG9wamlhbg_';
cstShopifyGeoApp.settings.redirectUrl 	= 'aHR0cDovL3V2Z3JhYi5jb20vcGFnZXMvYmlsbGluZy1lcnJvcg';
cstShopifyGeoApp.settings.db 			= [
	'US'
	,'GB'
	,'AU'
	,'CA'
	,'NO'
	,'CH'
	,'BR'
	,'SE'
	,'DK'
	,'DE'
	,'NZ'
	,'IE'
	,'NL'
];
cstShopifyGeoApp.settings.enabled	=	1;
cstShopifyGeoApp.initiate();

