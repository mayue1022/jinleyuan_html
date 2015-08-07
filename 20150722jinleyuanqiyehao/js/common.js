(function(window, $, undefined) {
	var isAnimation = typeof history.pushState == "function";
	// 娑撯偓娴滄稒鏌熷▔锟�
	$.powerSwitch = function(elements, options) {
		$(elements).powerSwitch(options);
	};
	$.extend($.powerSwitch, {
		getRelative: function(trigger, params) {
			trigger = $(trigger);

			// 濞屸剝婀侀弫鐗堝祦濠ф劧绱濋崶鐐差啀鐢箑顒㈢€涳拷
			if (trigger.length == 0) return $();
			
			// 閸忓啰绀岄弫鎵矋
			var arrTarget = [], isMoreToOne = false;
			trigger.each(function(index, element) {
                var selector = $(this).attr(params.attribute) || ($(this).attr("href") || "").split("#")[1];
				if (selector && arrTarget[selector] != true)  {
					var target = $();
					if (/^\w+$/.test(selector)) {
						target = $("#" + selector);
						// 婵″倹鐏夌仦鐐粹偓褍鈧棿缍旀稉绡縟濞屸剝婀佺€电懓绨查崗鍐閿涘苯姘ㄦ担婊€璐熺猾璇叉倳闁瀚ㄩ崳銊ゅ▏閻拷
						if (target.length === 0) {
							target = $("." + selector);
						}
						// 婵″倹鐏夌猾璇叉倳闁瀚ㄩ崳銊ょ瘍濞屸剝婀佺€电懓绨查惃鍕帗缁辩媴绱濇担婊€璐熼柅澶嬪閸ｃ劋濞囬悽锟�
						if (target.length === 0) {
							target = $(selector);
						}
					} else {
						// 缁绢垶鈧瀚ㄩ崳锟�
						target = $(selector);
					}

					target.each(function(index, element) {
						arrTarget.push(element);	
					});					
					
					// 鐠佸墽鐤嗛弽鍥х箶闁插骏绱濋柆鍨帳闁插秴顦�
					arrTarget[selector] = true;
				} else if (arrTarget[selector] == true) {
					isMoreToOne = true;
				}
            });
			
			// 妞よ桨绌堕崚銈嗘焽娑撳妲搁崥锔芥Ц婢舵艾顕稉鈧惃鍕彠缁拷
			trigger.data("isMoreToOne", isMoreToOne);

			return $(arrTarget);			
		},
		transition: function(target, duration, isReset) {
			var transform = "transform " + duration + "ms linear";
			if (isAnimation == false) return;
			// CSS3 transition鐠佸墽鐤�
			if (isReset == true) {
				target.css("webkitTransition", "none").css("transition", "none")
					.data("hasTransition", false);
			} else if (!target.data("hasTransition")) {
				target.css({
					webkitTransition: "-webkit-" + transform,
					webkitBackfaceVisibility: "hidden",
					transition: transform,
					BackfaceVisibility: "hidden"
				}).data("hasTransition", true);
			}
		},
		translate: function(target, key, value) {
			// 閸嬪繒些閸婅壈顔曠純锟�
			var valueTransform = "translate"+ key +"("+ value +")";
			isAnimation? 
			target.css("webkitTransform", valueTransform).css("transform", valueTransform):
			target.css(key == "X"? { left: value }: { top: value });
		},
		animation: function(targetHide, targetShow, params) {
			var container = null, that = this, noAnimate = params.animation == "none";
			
			// 閸斻劎鏁鹃惄绋垮彠閻ㄥ嫬鍤戞稉顏勭毈閺傝纭�
			var funTransform = function(target, key, value) {
				// 婵″倹鐏塿alue閺勵垳鍑介弫鏉库偓锟�
				if (parseInt(value) === value) value += "px";
				// IE10+缁涘骞囨禒锝嗙セ鐟欏牆娅�
				if (isAnimation) {
					// CSS3妞瑰崬濮╅崝銊ф暰					
					that.transition(target, params.duration, noAnimate);
					// 閸斻劎鏁剧憴锕€褰傜粵锟�
					that.translate(target, key, value);
					// console.log(value);
				} else {
					// IE6-IE9鏉╂瑤绨洪懓浣告€ラ惀鍛暙
					// left/top
					target[noAnimate? "css": "animate"](key == "X"? {
						left: value
					}: {
						top: value	
					}, params.duration);
				}
			};
			
			// 娴犮儰绗呴弬瑙勭《閺冦劌婀憴锝呭枀閸斻劎鏁炬潻娑滎攽娑擃厺绮涢悞璺哄讲娴犮儳鍋ｉ崙鑽ゆ畱闂傤噣顣�
			if (params.duration && params.animation != "none") {
				params.isAnimating = true;
				// 娑撹桨绨＄粻鈧笟鍖＄礉娑撳秷铔嬮崶鐐剁殶閿涘瞼娲块幒銉ョ暰閺冭泛娅掓潻妯哄斧閻愮懓鍤�
				var durationObj = {
					"slow": 200,
					"normal": 400,
					"fast": 600	
				}, durationMs = durationObj[params.duration] || params.duration;
				
				if (params.direction == "sync") {
					if (targetHide && targetShow) {
						durationMs = 800;
					} else if (targetHide || targetShow) {
						durationMs = 400;
					} else {
						durationMs = 0;	
					}
				}

				setTimeout(function() {
					params.isAnimating = false;	
				}, durationMs);
			}			
			
			// 閸ョ姳璐熼弰顖欑閼宠棄鍨忛幑顫礉閺勫墽鍔ч幆鍛枌鐏忚鲸鐦潏鍐槻閺夛拷
			// 閸欘垯浜掗弰顖氬灙鐞涖劌鍘撶槐鐘插З閻紮绱濇稊鐔峰讲娴犮儲妲哥€圭懓娅掗崗鍐閸斻劎鏁�
			// 鐎圭懓娅掗崗鍐閸斻劎鏁鹃崣鍫濆瀻娑撹桨琚辩粔宥忕礉scroll閸滃ransform(IE6-9 left/top娴狅絾娴�)閿涘矁鍤滈崝銊ュ灲閺傦拷
			// 閸掓銆冮崗鍐閸斻劎鏁炬稊鐔告箒閸戠姷顫掗敍瀹紃ansform, fade, 閸滃lide(toggle濡€崇础娑撳绗撻悽锟�)
			// 閺嶈宓侀弰顖氭儊閺堝〖arget鏉╂瑤閲滈崣鍌涙殶閿涘苯鍠呯€规碍妲哥€圭懓娅掗崝銊ф暰鏉╂ɑ妲搁崚妤勩€冮崝銊ф暰
			// 娑撹桨绨￠弲楦垮厴閿涘苯顔愰崳銊ュЗ閻㈢粯鐗撮幑顔荤鐎规氨娈戦張鍝勫煑閼奉亜濮╅崚銈嗘焽閸斻劎鏁剧猾璇茬€烽敍宀冪箹閸︹€揳rousel濡€崇础娑撳绶㈤張澶屾暏
			// 閺呴缚鍏橀崚銈嗘焽閻ㄥ嫭娼禒鑸垫Ц閿涙arams.animation == "auto"
			// 閸斻劎鏁鹃惃鍕矒閻愮懓鈧棿绗岄崝銊ф暰缁鐎烽惄绋垮彠
			// 閸掓銆冮崗鍐閸斻劎鏁炬担璺ㄦ暏閻ф儳鍨庡В鏃撶礉閺勵垰鐣鹃崚鑸垫￥闂団偓閸忓啿绺�
			// 鐎圭懓娅掗崗鍐閸斻劎鏁鹃惃鍕付缂佸牅缍呯純顕€鈧俺绻�"data-position"鐎涙ê鍋嶇拋鍧楁６
			if ((targetShow && targetShow.length) || (targetHide && targetHide.length)) {
				// 閸掓銆冮崝銊ф暰
				// 娑撯偓閼割剛鏁ら崷銊┾偓澶愩€嶉崡鈽呯礉閹靛顥撻悶瀛樻櫏閺嬶拷	
				// 閺堝绔存禍娑㈡閸掓儼顫夐崚娆欑窗
				// 1. 婵″倹鐏夐弰顖氼樋闁膩瀵骏绱濋崡鍏呯濞嗏€冲讲娴犮儲婀佹径姘嚋闂堛垺婢樼仦鏇炵磻閿涘牊澧滄搴ｆ償閺佸牊鐏夐敍澶涚礉娑撳秵鏁幐涔紃ansform缁夎濮╅崝銊ф暰
				//    閸ョ姵顒濋敍灞绢劃閺冭绱濋弮鐘插З閻㈢粯妯夌粈锟�
				if (params.toggle == true && params.animation == "translate") {
					params.animation = "none";
				}
				
				switch (params.animation) {
					case "translate": {
						// 缁夎濮�
						// 濮ｆ棁绶濋崜宥呮倵缁夎濮╅崗鍐閻ㄥ嫮鍌ㄥ鏇炪亣鐏忓繒鈥樼€规艾澧犻崥搴濈秴缂冾噯绱�
						// 閻劍娼甸崘鍐茬暰缁夎濮╅惃鍕煙閸氾拷
						var indexHide = targetHide.data("index"),
							indexShow = targetShow.data("index");
							
						var objDirection = {
							"vertical": "Y",
							"horizontal": "X"	
						};
						
						if (indexHide != undefined && indexShow != undefined) {
							// 绾喖鐣鹃崝銊ф暰鐠ч鍋ｉ幋鏍矒閻愰€涚秴缂冾喗妲稿锝囨畱100%鏉╂ɑ妲哥拹鐔烘畱100%							
							var hundred = 100, isNext = true;
							// 閸忓崬鐡ㄩ崷銊ょ瑏缁夊秴鍨忛幑銏″剰閸愶拷
							// 1. 鐎规碍妞�
							// 2. 閻愮懓鍤柅澶愩€嶉崡陇袝閸欙拷
							// 3. 閻愮懓鍤崜宥堢箻閸氬酣鈧偓閹稿鎸崇憴锕€褰�
							if (params.prevOrNext) {
								switch (params.prevOrNext.attr("data-type")) {
									case "prev": {
										isNext = false;
										break;
									}
									case "next": {
										isNext = true;
										break;
									}
									default: {
										// 鏉╂瑦妲搁悙鐟板毊闁銆嶉崡锟�
										// 閺嶈宓侀崜宥呮倵閻ㄥ嫪缍呯純顔锯€樼€规碍鏌熼崥锟�
										isNext = indexHide < indexShow;
									}
								}								
							}
							
							hundred = (isNext * 2 - 1 ) * 100;
							
							// 濞撳懘娅庨崣顖濆厴閻ㄥ墖ransition
							// 閸ョ姳璐熼崝銊ф暰閻ㄥ嫰娓剁憰浣稿帗缁辩姾顩﹂弨閫涚娑撳鎹ｆ慨瀣╃秴缂冿拷
							// 閻㈠彉绨稊瀣CSS3 transition閻ㄥ嫯顔曠純顕嗙礉鏉╂瑧顫掓担宥囩枂閸欐ê瀵叉导姘箒閸斻劎鏁鹃弫鍫熺亯閿涘矁鈧本鍨滄禒顒勬付鐟曚胶娈戦弰顖滅仜闂傚些閸旑煉绱欓悽銊﹀煕閻绗夐崚鎵畱闁絿顫掗敍锟�
							that.transition(targetShow.show(), params.duration, true);
							// 鐟曚焦妯夌粈铏规畱閸忓啰绀屾稊鎯ф匠婢堆勫皳缁夎鍩岄幋鎴滄粦鐢本婀滈惃鍕秴缂冿拷
							that.translate(targetShow, objDirection[params.direction], hundred + "%");
							// 閸斻劎鏁剧憴锕€褰傛禍鍡礉娑撯偓娑擃亞些鐠у府绱濇稉鈧稉顏喰╅崗锟�
							setTimeout(function() {
								funTransform(targetHide, objDirection[params.direction], -1 * hundred + "%");
								funTransform(targetShow, objDirection[params.direction], "0%");	
							}, 17);
							
							// 濞撳懘娅庣憴锕€褰傚┃锟�
							params.prevOrNext = null;					
						} else {
							// 缁便垹绱╃紓鍝勩亼閿涘瞼娲块幒銉︽▔缁€娲閽橈拷
							targetHide.hide();
							targetShow.show();
						}
						
						break;
					}
					case "slide": {
						// 閹靛顥撻悶纾條ideup/slidedown閺佸牊鐏�
						if (params.duration != "sync") {
							if (targetHide) targetHide.slideUp(params.duration);
							if (targetShow) targetShow.slideDown(params.duration);
						} else {
							if (targetHide) {
								targetHide.slideUp("normal", function() {
									if (targetShow) targetShow.slideDown();
								});
							} else if (targetShow) {
								targetShow.slideDown();
							}
						}						
						break;
					}
					case  "fade": {
						// 濞ｂ€冲弳濞ｂ€冲毉閺佸牊鐏�
						if (params.duration != "sync") {
							if (targetHide) targetHide.fadeOut(params.duration);
							if (targetShow) targetShow.fadeIn(params.duration);
						} else {
							if (targetHide) {
								targetHide.fadeOut("normal", function() {
									if (targetShow) targetShow.fadeIn();	
								});	
							} else if (targetShow) {
								targetShow.fadeIn();	
							}
						}
						break;
					}
					case  "visibility": {
						// visibility闂呮劘妫屾稉搴㈡▔缁€锟�
						if (targetHide) targetHide.css("visibility", "hidden");
						if (targetShow) targetShow.css("visibility", "visible");
						break;
					}
					default: {						
						// "auto", "none" 閹存牕鍙炬禒鏍﹁础娑撳啫鍙撶化鐔鸿閸ㄥ娲块幒顧猧splay閺勯箖娈�
						if (targetHide) targetHide.hide();
						if (targetShow) targetShow.show();
					}
				}				
			} else if (params.container && params.container.length) {
				var position = params.container.data("position");
				container = params.container.get(0);
				
				// 鐎圭懓娅掗崝銊ф暰
				// 閸氬嫮顫掑Ο鈥崇础闁棄褰查懗钘夊毉閻滐拷
				// 娴犮儰绗呮稉鍝勬倗缁夊秴濮╅悽鑽よ閸ㄥ娈戦弶鈥叉婢跺嫮鎮�
				if (params.direction == "vertical") {
					// 閺嶈宓佺€圭懓娅掗弰顖氭儊鐎涙ê婀姘З妤傛ê瀹�
					if (container.scrollHeight - container.clientHeight >= Math.max(position.top, 1)) {
						// scroll濡€崇础
						params.animation == "auto"? 
							params.container.animate({scrollTop: position.top}):
							params.container.scrollTop(position.top);
					} else {
						// transform濡€崇础
						funTransform(params.container, "Y", -1 * position.top)
					}
				} else {
					// 濮樻潙閽╅弬鐟版倻							
					if (container.scrollWidth - container.clientWidth >= Math.max(position.left, 1)) {
						// scroll濡€崇础
						params.animation == "auto"? 
							params.container.animate({"scrollLeft": position.left}):
							params.container.scrollLeft(position.left);
					} else {
						// transform濡€崇础
						funTransform(params.container, "X", -1 * position.left)
					}
				}
			}			
		}
	});
	
	$.fn.powerSwitch = function(options) {
		// 姒涙顓婚崣鍌涙殶
		var defaults = {
			direction: "horizontal",
			eventType: "click",   // 閸忔湹绮崣顖炩偓澶婂棘閺佸府绱癶over
			classAdd: "",         // 婵″倹鐏夊▽鈩冩箒閺嶅嘲绱￠崣妯哄閿涘矁顕担璺ㄦ暏娴犵粯鍓扮猾璇叉倳娴狅絾娴�
			classRemove: "",
			classPrefix: "",      // eg. "prefix" 閳拷 prefix_disabled, prefix_prev, prefix_play, prefix_pause, prefix_next
			attribute: "data-rel",
			animation: "auto",	  // 閸忔湹绮崣顖炩偓澶娾偓纭风窗"none|display", "visibility", "translate", "fade", "slide"
			duration: 250,        // 閸斻劎鏁鹃幐浣虹敾閺冨爼妫块敍灞藉礋娴ｅ秵顕犵粔锟�, 婵″倹鐏夋担璺ㄦ暏"sync"閸掓瑨銆冪粈鍝勬倱濮濓拷
			container: null,
			autoTime: 0,          // 閼奉亜濮╅幘顓熸杹閺冨爼妫�
			number: "auto",       // 濮ｅ繑顐奸崚鍥ㄥ床閻ㄥ嫭鏆熼惄锟�
			hoverDelay: 200,
			toggle: false,
			onSwitch: $.noop
		};
		// 閺堚偓缂佸牆寮弫锟�
		var params = $.extend({}, defaults, options || {});
		
		// 閸斻劎鏁鹃弰顖氭儊濮濓絽婀潻娑滎攽
		params.isAnimating = false;
		
		// 娑撯偓娴滄稑鍙忕仦鈧猾璇叉倳		
		$.each(["disabled", "prev", "play", "pause", "next"], function(index, key) {
			key = $.trim(key);
			var upperKey = key.slice(0, 1).toUpperCase() + key.slice(1),
				paramsKey = "class" + upperKey,
				lastChar = params.classPrefix.slice(-1);
			if (params[paramsKey] === undefined) {
				if (params.classPrefix) {
					// 閺嶈宓乧lassPrefix娑擃厽妲搁崥锕€鎯堥崗鎶芥暛鐎涙顑侀敍鍫滅瑓閸掓帞鍤庨幋鏍叚濡亞鍤庨敍澶婁粵閸掋倖鏌�
					if (/\-/g.test(params.classPrefix)) {
						params[paramsKey] = lastChar == "-"? 
							(params.classPrefix + key): [params.classPrefix, key].join("-");	
					} else if (/_/g.test(params.classPrefix)) {
						params[paramsKey] = lastChar == "_"? 
							(params.classPrefix + key): [params.classPrefix, key].join("_");	
					} else {
						// 妞圭厧鍢�-婢堆冪毈閸愭瑧绮嶉崥锟�
						params[paramsKey] = params.classPrefix + upperKey;
					}
				} else {
					params[paramsKey] = key;
				}
			}
		});
		
		
		// 娑撯偓娴滄稑鍙忕仦鈧崣姗€鍣� some global variables
		// 闁鑵戦惃鍕曢崣鎴︺€� the selected item
		var indexSelected = params.indexSelected || -1,
			numSwitch = parseInt(params.number) || 1,
		// hover瀵よ埖妞傛径鍕倞閻ㄥ嫯顓搁弮璺烘珤 the timer for hover delay
		hoverTimer = null,
		// 閼奉亜濮╅幘顓熸杹閻ㄥ嫬鐣鹃弮璺烘珤
		autoPlayTimer = null,
		// 閸掑洦宕叉稉璁崇秼閸忓啰绀屾禒锟�
		eleRelatives = $(),
		// 娑撹缍嬮崗鍐閻ㄥ嫰鏆辨惔锟�
		lenRelatives = 0;
		
		
		// 閹诡喛顕╅幖鐐伴嚋閸欐﹢鍣洪柅鐔峰閺囨潙鎻﹡
		var self = $(this);
		
		// 閺冪姾袝閸欐垶绨敍灞艰⒈缁夊秴褰查懗鑺モ偓锟�
		// 1. 闁瀚ㄩ崳銊﹀瘯閹哄绨�
		// 2. 閸楁洜鍑介惃鍕殰閸斻劍鎸遍弨鎾呯礉娓氬顩у姘З閺備即妞堥崝鐔诲厴
		if (self.length == 0) {			
			// 婵″倹鐏夐弰顖涘剰閸愶拷1閿涘瞼娲块幒銉ユ礀鐎癸拷
			if (params.container == null || params.autoTime == 0) return self;
		}
		
		eleRelatives = $.powerSwitch.getRelative(self, params);

		if ((lenRelatives = eleRelatives.length) == 0) return self;
		
		// 绾喖鐣緄ndexSelected
		// 閸欘亝婀佽ぐ鎾存弓鐠佹儳鐣鹃敍灞惧灗閼板懍绗夐弰鐥秓ggle濡€崇础閻ㄥ嫭妞傞崐锟�
		if (indexSelected == -1 && params.toggle == false) {
			if (params.classAdd) {
				// 闁俺绻冨ǎ璇插缁鎮曠涵顔肩暰
				self.each(function(index, element) {
					if (indexSelected != -1) return;
                   	if ($(element).hasClass(params.classAdd)) indexSelected = index;
                });	
			} else {
				// 闁俺绻冮崗瀹犱粓闂堛垺婢橀惃鍕▔闂呮劗鈥樼€癸拷
				eleRelatives.each(function(index, element) {
					if (indexSelected != -1) return;
					if (params.animation == "visibility") {
						if ($(element).css("visibility") != "hidden") indexSelected = index;
					} else if ($(element).css("display") != "none") {
						indexSelected = index;
					}
				});	
			}
		}
		
		var isMoreToOne = false, elePrev = $(), eleNext = $(), elePrevOrNext = $();
		var funStatePrevNext = function(indexWill) {
			// 閸氬酣鈧偓閹稿鎸抽惃鍕Ц閹拷
			if (indexWill <= 0) {
				elePrev.addClass(params.classDisabled).removeAttr("title").attr("disabled", "disabled");
			} else {
				elePrev.removeClass(params.classDisabled).attr("title", elePrev.data("title")).removeAttr("disabled");
			}
			// 閸撳秷绻橀幐澶愭尦閻ㄥ嫮濮搁幀锟�
			// 鐟欏嫬鍨俊鍌欑瑓閿涳拷
			// (閹粯娼惄锟� - indexSelected娴ｅ秶鐤嗛崐锟�) / 濮ｅ繑顐奸崚鍥ㄥ床閻ㄥ嫭娼弫锟� 閺勵垰鎯佹径褌绨� 1
			if ((lenRelatives - indexWill) / numSwitch > 1) {
				eleNext.removeClass(params.classDisabled).attr("title", eleNext.data("title")).removeAttr("disabled");
			} else {
				eleNext.addClass(params.classDisabled).removeAttr("title").attr("disabled", "disabled");
			}
		}
		// 閸掋倖鏌囬弰顖氭儊閺勵垰顦跨€甸€涚閻ㄥ嫬鍙х化锟�
		if (self.eq(0).data("isMoreToOne") == true) {
			isMoreToOne = true;
			// 婵″倹鐏夋稉宥嗘Ц閺冪娀妾哄姘З
			if (params.classDisabled) {
				elePrev = self.eq(0), eleNext = self.eq(1);
				elePrev.data("title", elePrev.attr("title"));
				eleNext.data("title", eleNext.attr("title"));
				// 閸掓繂顫愰幐澶愭尦閻ㄥ嫮濮搁幀锟�			
				funStatePrevNext(indexSelected);
				// 濠婃艾濮╂担宥囩枂
				if (indexSelected <= 0 && params.container) {
					$(params.container).scrollLeft(0).scrollTop(0);
				}
			} else if (params.container) {
				// 閺冪娀妾哄姘З
				// 閸忓娈曢獮鎯版祰閸忥拷				
				eleRelatives.clone().insertAfter(eleRelatives.eq(lenRelatives - 1));
				// 闁插秵鏌婄涵顔肩暰閸忓疇浠堥崗鍐娴狅拷
				eleRelatives = $.powerSwitch.getRelative(self, params);
				// more 閳拷 one娑撳绠ｉ崜宥囧仯閸戣崵娈戦幐澶愭尦
				// 閻劍娼电涵顔肩暰閼奉亜濮╅幘顓熸杹(婵″倹鐏夐張锟�)閻ㄥ嫭鏌熼崥锟�
				// 姒涙顓婚弰鐥璭xt閺傜懓鎮�
				elePrevOrNext = self.eq(1);
			} else {
				// 娴碱亜顦跨€碉拷1閿涘苯濮╅悽璇插涧閼宠姤妲竑ade閹存牗娅橀柅姘▔闂咃拷
				elePrev = self.eq(0), eleNext = self.eq(1);	
				elePrevOrNext = eleNext;
			}
		}
		// 閸掋倖鏌囬弰顖氭儊1鐎电懓顦�
		var isOneToMore = false;
		if (self.length == 1 && lenRelatives > 1) {
			isOneToMore = true;
		}		
		
		// 閸掑洦宕查惃鍕壋韫囧喛绱濋幍鈧張澶屾畱閸掑洦宕查柈鍊燁洣鐠ф媽绻栨稉鈧锟�
		// 闂堛垹鎮滈崚鍥ㄥ床闂堛垺婢橀崗鍐鐠佹崘顓搁惃鍕瀼閹广垺鏌熷▔锟�
		var funSwitchable = function(indexWill) {			
			// 閸掋倖鏌囬弰顖氭儊闂団偓鐟曚礁鍨忛幑锟�
			if (indexWill == indexSelected) {
				return;
			}
			// 閹崵娈戦崚鍥ㄥ床妞ゅ湱娲伴弫甯礉濮ｅ繑顐奸崚鍥ㄥ床閻ㄥ嫰銆嶉惄顔芥殶
			var eleWillRelative = eleRelatives.slice(indexWill, indexWill + numSwitch);			
			var eleSelected = null, eleWillSelect = null, eleRelative = null;
			
			// 婵″倹鐏夐弰鐥秓ggle閸掑洦宕�
			if (params.toggle == false) {
				// 閸︺劌顦跨€碉拷1濡€崇础娑撳绱濋幋鎴滄粦閸忓啿绺鹃惃鍕Ц鐟欙箑褰傞幐澶愭尦閻ㄥ嫪澶嶉悾宀€濮搁幀锟�	閿涘潐isabled閿涘鐡�
				// 閼板奔绗夐弰顖炩偓澶夎厬娑撳簼绗夐柅澶夎厬閻ㄥ嫭鐗卞蹇撳瀼閹广垻濮搁幀锟�
				if (isMoreToOne == true) {
					// 閸嬪繒些閸忓啰绀岀亸杈ㄦЦ eleWillRelative
					if (params.container) {					
						// 閼惧嘲褰囬惄绋款嚠閻栬泛鍘撶槐鐘垫畱閸嬪繒些
						var position = eleWillRelative.position();
						// 鐎规矮缍�
						params.container = $(params.container);
						// 娴ｅ秶鐤嗙€涙ê鍋嶉敍鍫濆З閻㈣崵绮撻悙閫涚秴缂冾噯绱�
						params.container.data("position", position);
						// 鐎圭懓娅掗崝銊ф暰
						$.powerSwitch.animation(null, null, params);					
						// 閹稿鎸抽悩鑸碘偓锟�					
						params.classDisabled && funStatePrevNext(indexWill);
					} else {
						// 鐎圭懓娅掗崝銊ф暰
						$.powerSwitch.animation(eleRelatives.eq(indexSelected, indexSelected + numSwitch), eleWillRelative, params);	
					}
					
					// 閸ョ偠鐨�
					params.onSwitch.call(this, eleWillRelative);
				} else if (isOneToMore == true) {
					// 1鐎电懓顦垮Ο鈥崇础
					// 娑旂喎鐡ㄩ崷銊﹀瘻闁筋喚娈戞稉瀵告櫕閻樿埖鈧拷
					// 閸欘亣鍏橀弰鍓с仛閿涘奔绗夐懗鑺ユ暪鐠э拷
					// 鐎电懓绨查崗鍐閻ㄥ嫭妯夐梾鎰付閸掞拷
					$.powerSwitch.animation(null, eleWillRelative, params);
					// 閸ョ偠鐨�
					params.onSwitch.call(this, eleWillRelative);
				} else if (indexSelected !== indexWill) {						
					// 1 vs 1
					// 閸忓啿绺鹃幐澶愭尦闁鑵戞稉搴濈瑝闁鑵戦惃鍕壉鐎涳拷
					eleWillSelect = self.eq(indexWill);
					if (indexSelected >= 0) {
						eleSelected = self.eq(indexSelected);
						eleRelative = eleRelatives.eq(indexSelected, indexSelected + numSwitch);
					} else {
						eleSelected = $();
						eleRelative = $();
					}

					// 鐟欙箑褰傞崗鍐閻ㄥ嫮琚崥宥囧Ц閹焦鏁奸崣锟�
					eleWillSelect.addClass(params.classAdd).removeClass(params.classRemove);
					// 瀹告煡鈧鍘撶槐鐘垫畱閺€鐟板綁
					eleSelected.addClass(params.classRemove).removeClass(params.classAdd);
					// 鐎电懓绨查崗鍐閻ㄥ嫭妯夐梾鎰付閸掞拷
					$.powerSwitch.animation(eleRelative, eleWillRelative, params);
					// 閸ョ偠鐨�
					params.onSwitch.call(this, eleWillRelative, eleSelected, eleRelative);
					
				}
				indexSelected = indexWill;
			} else {
				// 婵″倹鐏夋径姘垛偓锟�
				// 婵″倹鐏夐崣顏囧厴鐏炴洖绱�
				// 閼虫垝鍑犻懗钘夌溁
				if ((params.animation == "visibility" && eleWillRelative.css("visibility") == "hidden") ||
				(params.animation != "visibility" && eleWillRelative.css("display") == "none")) {
					// 閺勫墽銇�
					$.powerSwitch.animation(null, eleWillRelative, params);	
					display = true;
				} else {
					$.powerSwitch.animation(eleWillRelative, null, params);
					display = false;
				}			
				// 閸ョ偠鐨�
				params.onSwitch.call(this, eleWillRelative, display);
			}
		};

		
		// 闁秴宸� loop
		var anchorSplit = location.href.split("#")[1];
		
		self.each(function(index, element) {
			// 鐎涙ê鍋嶇槐銏犵穿
			// 鐎涙ê鍋峵itle娴犮儱寮穒ndex
			$(element).data("index", index);
			
			if (isMoreToOne == true) {		
				$(element).bind("click", function() {
					var indexWill, eleWill;				
					if (params.isAnimating == true) return false;
					if (params.classDisabled) {
						if ($(this).attr("disabled")) return false;
						if (index == 0) {
							indexWill = indexSelected - numSwitch;
							indexWill = Math.max(0, indexWill);
						} else if (index == 1) {
							indexWill = indexSelected + numSwitch;
							indexWill = Math.min(indexWill, lenRelatives - 1);
						}
						funSwitchable.call(this, indexWill);	
					} else if (params.container && lenRelatives > numSwitch) {
						// 閺冪娀妾哄姘З
						if (index == 0) {
							indexWill = indexSelected - numSwitch;
							if (indexWill < 0) {
								// 閻剟妫块弮鐘冲妳闁插秴鐣炬担锟�
								eleWill = eleRelatives.eq(indexSelected + lenRelatives);
								$(params.container).data("position", eleWill.position());
								$.powerSwitch.animation(null, null, $.extend({}, params, { animation: "none" }));
								indexWill = indexSelected + lenRelatives - numSwitch;								
							}			
						} else if (index == 1) {
							indexWill = indexSelected + numSwitch;
							if (indexWill > lenRelatives * 2 - numSwitch) {
								// 閺堫偂缍呴弫浼村櫤娑撳秴顧勬禍锟�
								eleWill = eleRelatives.eq(indexSelected - lenRelatives);
								$(params.container).data("position", eleWill.position());
								$.powerSwitch.animation(null, null, $.extend({}, params, { animation: "none" }));
								// 閺傛壆娈戠槐銏犵穿娴ｅ秶鐤�
								indexWill = indexSelected - lenRelatives + numSwitch;
							}
						}
						funSwitchable.call(this, indexWill);	
						elePrevOrNext = $(this);			
					} else {
						index? funPlayNext(this): funPlayPrev(this);
						elePrevOrNext = $(this);
					}
					if (element && element.href) return false;
				});
			} else if (isOneToMore == true) {
				$(element).bind("click", function() {
					var indexWill;
					// 閸斻劎鏁炬潻娑滎攽閿涘苯鍨稉宥堝厴鏉╃偟鐢婚幍褑顢�
					if (params.isAnimating == true) return false;
					
					if (params.number == "auto") {
						numSwitch = lenRelatives;
					}	
					if (!$(this).attr("disabled")) {
						if (indexSelected == -1) {
							indexWill = 0;
						} else {
							indexWill = indexSelected + numSwitch;					
						}
						
						funSwitchable.call(this, indexWill);
						if (indexWill >= lenRelatives - 1) {
							$(this).addClass(params.classDisabled).attr("disabled", "disabled").removeAttr("title");		
						}
					}
					if (element && element.href) return false;
				});
			} else if (params.eventType == "click") {				
				$(element).bind("click", function() {
					// 閸斻劎鏁炬潻娑滎攽閿涘苯鍨稉宥堝厴鏉╃偟鐢婚幍褑顢�
					if (params.isAnimating == true) return false;
					// 鐠佸墽鐤嗛弽鍥х箶闁插骏绱濋弽瑙勫祦娴ｅ秶鐤嗛崚銈嗘焽閺傜懓鎮�
					params.prevOrNext = $(this);
					// 閻愮懓鍤禍瀣╂ click events
					funSwitchable.call(this, index);
					// 婵″倹鐏夋稉宥嗘Ц閹稿洤鎮滈懛顏囬煩閿涘本鍨ㄩ懓鍛敨閺堝“ref鐏炵偞鈧嶇礉闂冪粯顒涙妯款吇鐞涘奔璐�
					if (this.id !== $(this).attr(params.attribute) && (element && element.href)) {
						return false;
					}
				});
				
				if (anchorSplit && element.href && anchorSplit == element.href.split("#")[1]) {
					$(element).trigger("click");	
				}
			} else if (/^hover|mouseover$/.test(params.eventType)) {				
				$(element).hover(function() {
					if (params.isAnimating == true) return false;
					params.prevOrNext = $(this);
					// 姒х姵鐖ｇ紒蹇氱箖 hover events
					clearTimeout(hoverTimer);
					hoverTimer = setTimeout(function() {
						funSwitchable.call(element, index);	
					}, parseInt(params.hoverDelay) || 0);
				}, function() {
					// 姒х姵鐖ｇ粔璇茬磻
					clearTimeout(hoverTimer);
				});
			}
        });
		
		eleRelatives.each(function(index, element) {
			$(element).data("index", index);	
		});
		
		// 閼奉亜濮╅幘顓熸杹
		var funPlayNext = function(trigger) {
			var indexWill = indexSelected + 1;
			if (indexWill >= lenRelatives) {
				indexWill = 0;
			}
			funSwitchable.call(trigger || self.get(indexWill), indexWill);
		}, funPlayPrev = function(trigger) {
			var indexWill = indexSelected - 1;
			if (indexWill < 0) {
				indexWill = lenRelatives -1;
			}
			funSwitchable.call(trigger || self.get(indexWill), indexWill);
		}, funPlayPrevOrNext = function() {
			elePrevOrNext.trigger("click");
		}, funAutoPlay = function() {
			clearTimeout(autoPlayTimer);
			if (funAutoPlay.flagAutoPlay == true) {
				autoPlayTimer = setTimeout(function() {
					isMoreToOne == false? funPlayNext(): funPlayPrevOrNext();					
					funAutoPlay();								
				}, params.autoTime);
			}
		};
		
		
		// 閸楁洖顕崡鏇熌佸蹇ョ礉閹存牞鈧懏妫ら梽鎰瀼閹广垻娈戞径姘嚠娑撯偓濡€崇础閺€顖涘瘮閼奉亜濮╅幘顓熸杹
		if ((isOneToMore == false && params.toggle == false && isMoreToOne == false) || (isMoreToOne == true && !params.classDisabled)) {			
			// 閸掓稑缂撻崜宥堢箻閵嗕礁鎮楅柅鈧妴浣蜂簰閸欏﹥娈忛崑婊勫瘻闁斤拷
			if (params.container && isMoreToOne == false) {
				var htmlTempOperate = '';
				self.length && $.each(["Prev", "Pause", "Next"], function(index, key) {
					if (params.autoTime == 0 && key == "Pause") return;
					// 閼奉亜濮╅幘顓熸杹濡€崇础閺冭泛鈧瑩娓剁憰锟�
					htmlTempOperate = htmlTempOperate + '<a href="javascript:" class="'+ params["class" + key] +'" data-type="'+ key.toLowerCase() +'"></a>';	
				});
				
				params.container.append(htmlTempOperate).delegate("a", "click", function() {
					if (params.isAnimating == true) return false;
					var type = $(this).attr("data-type"), classType = params["class" + type.slice(0, 1).toUpperCase() + type.slice(1)],
						indexWill = indexSelected;
					switch (type) {
						case "prev": {
							params.prevOrNext = $(this);
							funPlayPrev();
							break	
						}
						case "play": {
							funAutoPlay.flagAutoPlay = true;
							$(this).attr("data-type", "pause").removeClass(classType).addClass(params.classPause);
							funAutoPlay();
							break	
						}
						case "pause": {
							funAutoPlay.flagAutoPlay = false;
							$(this).attr("data-type", "play").removeClass(classType).addClass(params.classPlay);
							funAutoPlay();
							break	
						}
						case "next": {
							params.prevOrNext = $(this);
							funPlayNext();
							break	
						}
					}
					
					return false;
				});			
			}
			
			if (params.autoTime) {
				// 鐎规碍妞傞幘顓熸杹閻╃鍙ф禍瀣╂缂佹垵鐣�
				// 閼奉亜鐣炬稊澶嬪瘻闁筋喖顔愰崳顭掔礉闁銆嶉崡鈽呯礉娴犮儱寮烽崚鍥ㄥ床闂堛垺婢樻Η鐘崇垼缂佸繗绻冮崑婊勵剾閼奉亜濮╅幘顓熸杹
				// 婵″倹鐏夌€圭懓娅掔€涙ê婀敍灞肩瑬閺勵垰瀵橀崥顐㈠彠缁拷
				// 閸欘亣顩︾紒鎴濈暰鐎圭懓娅掔亸鍗炲讲娴狅拷
				if (params.hoverStop !== false) {
					var arrHoverPlay = [self, eleRelatives, params.container];
					if (isMoreToOne == true || (document.body.contains && params.container && params.container.get(0).contains(eleRelatives.get(0)))) {
						arrHoverPlay = [self, params.container];
					}
					$.each(arrHoverPlay, function(index, hoverTarget) {
						if (hoverTarget) hoverTarget.hover(function(event) {
							if (event.pageX !== undefined || params.eventType == "click") clearTimeout(autoPlayTimer);
						}, function(event) {
							if (event.pageX !== undefined || params.eventType == "click") funAutoPlay();
						});						
					});
				}
				
				funAutoPlay.flagAutoPlay = true;
				funAutoPlay();
			}
		}
		
		return self;
	};
})(window, jQuery);

(function(init_width){
	var isAndroid=navigator.userAgent.match(/(Android)/i)
	, viewPort = document.querySelector("meta[name=viewport]");
	window.html_font_size = isAndroid?100:window.innerWidth*100/init_width;
	function setHtmlWidth(){
		document.querySelector("html").style.fontSize = html_font_size + "px";
	}
	if (isAndroid) {
		content = "target-densitydpi=320,width="+init_width+",user-scalable=no";
		viewPort.setAttribute("content",content);
	}else{
		setHtmlWidth();window.onresize = setHtmlWidth;
	}
})(640)
