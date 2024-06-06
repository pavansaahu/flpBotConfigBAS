sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/m/Dialog",
	"sap/m/Text",
	"sap/m/Button"
], function (UIComponent, Dialog, Text, Button) {
	"use strict";
	var that = this;

	return UIComponent.extend("com.demoflpbot.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			var rendererPromise = this._getRenderer();
			rendererPromise.then(function (oRenderer) {
				// oRenderer.addHeaderEndItem({
				// 	icon: "sap-icon://add",
				// 	tooltip: "Add bookmark",
				// 	press: function () {

// SAP Conversational AI Bot
						// that.renderRecastChatbot();
						// if (!document.getElementById("cai-webchat")) {
						// 	var s = document.createElement("script");
						// 	s.setAttribute("id", "cai-webchat");
						// 	s.setAttribute("src", "https://cdn.botpress.cloud/webchat/v2/inject.js");
						// 	s.setAttribute("src", "https://mediafiles.botpress.cloud/b72c147c-0f57-4f21-ad10-a0873532dbf6/webchat/v2/config.js");
						// 	document.body.appendChild(s);
						// }
						// s.setAttribute("channelId", "botId=b72c147c-0f57-4f21-ad10-a0873532dbf6");
						// s.setAttribute("token", "bp_pat_X2bMuWXx7tJRYcT42N6mpEnzewgOZpCCLwpL");



						if (!document.getElementById("cai-webchat")) {
							// Create the first script element
							var s1 = document.createElement("script");
							s1.setAttribute("id", "cai-webchat");
							s1.setAttribute("src", "https://cdn.botpress.cloud/webchat/v2/inject.js");
					
							// Append the first script element to the body
							s1.onload = function() {
								console.log("Botpress inject script loaded.");
					
								// Create the second script element
								var s2 = document.createElement("script");
								s2.setAttribute("src", "https://mediafiles.botpress.cloud/b72c147c-0f57-4f21-ad10-a0873532dbf6/webchat/v2/config.js");
					
								// Append the second script element to the body
								s2.onload = function() {
									console.log("Botpress config script loaded.");
									// Ensure the webchat is initialized if necessary
									if (window.botpressWebChat) {
										window.botpressWebChat.init();
									}
								};
								
								s2.onerror = function() {
									console.error("Failed to load the Botpress config script.");
								};
								
								document.body.appendChild(s2);
							};
					
							s1.onerror = function() {
								console.error("Failed to load the Botpress inject script.");
							};
					
							document.body.appendChild(s1);
						}
						
			// 		}
			// 	}, true); // Set bRight to true to add the button to the right side
			});
			//this.renderRecastChatbot();
			return;
		},
		renderRecastChatbot: function () {
			if (!document.getElementById("cai-webchat")) {
				var s = document.createElement("script");
				s.setAttribute("id", "cai-webchat");
				s.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");
				document.body.appendChild(s);
			}
			s.setAttribute("channelId", "b51f5c69-a323-4689-a41d-9fd44297c5da");
			s.setAttribute("token", "d2014f3f6b25f640ab7dbbf8db6d472d");
		},
		_getRenderer: function () {
			var that = this,
				oDeferred = new jQuery.Deferred(),
				oRenderer;

			that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!that._oShellContainer) {
				oDeferred.reject(
					"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
			} else {
				oRenderer = that._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					// renderer not initialized yet, listen to rendererCreated event
					that._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject("Illegal state: shell renderer not available after receiving 'rendererLoaded' event.");
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}
			return oDeferred.promise();
		}
	});
});