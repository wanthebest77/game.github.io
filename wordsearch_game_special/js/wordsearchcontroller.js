"use strict";

/** This object sets up the word search game, as well as button functions (for solving
 * and for refreshing/setting up a new game).
 *
 * @author Noor Aftab
 *	
 * @param {String} gameId ID of the word search game div (where the actual grid of letters goes)
 * @param {String} listId ID of the div where the list of words to find goes
 * @param {String} solveId ID for button to solve the puzzle
 * @param {String} newGameId ID for button to start a new game
 * @param {String} instructionsId ID for the h2 heading (to allow us to update it's text with ease)
 * @param {String} themeId ID for part of the h3 heading (to show the theme of the word search)
 */

function WordSearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {

	//an object containing various themes/words for the game
	var searchTypes = {
			"mach1": [
				["property"], ["enhance"], ["hypothesis"], ["relaxed"], ["handpicked"], ["exaggerated"],
				["so long as"], ["renovate"], ["long for"], ["enclose"], ["durable"], ["atmosphere"],
				["application"], ["commitment"], ["concern"], ["properly"], ["disruption"], ["promote"],
				["strive to do"], ["relaxing"]
			],
			"mach2": [
				["extension"], ["connect with"], ["replacement"], ["deserve"], ["residential"], ["pandemic"],
				["dispose of"], ["solid"], ["crew"], ["secured"], ["sales representative"], ["tub"],
				["oversized"], ["regulation"], ["burst"], ["appreciate"], ["tower"], ["stillness"],
				["tremble"], ["snap around"]
			],
			"mach3": [
				["play a trick"], ["ghostly"], ["pound"], ["glow"], ["basement"], ["dreadful"],
				["creep over"], ["ball"], ["fancy"], ["carnival"], ["stuck"], ["crash into"],
				["overjoyed"], ["triumphantly"], ["bow"], ["porch"], ["yawn"], ["dew"],
				["scent"], ["drip"]
			],
			"mach4": [
				["dim"], ["slip away"], ["exposure"], ["run through"], ["faith"], ["mess up"],
				["run through"], ["correct"], ["in succession"], ["worked up"], ["give in"],
				["be a bundle of nerves"], ["set oneself up for"], ["regardless of"], ["dedicated"],
				["industrious"], ["productivity"], ["priority"], ["direct"], ["linear"]
			],
			"mach5": [
				["figurative"], ["marginalize"], ["miss out on"], ["neurobiological"], ["standpoint"],
				["recontextualize"], ["previously"], ["invisible"], ["engage"], ["mode"], ["stimulate"],
				["association"], ["neural"], ["node"], ["engagement"], ["reimagine"], ["exercise"],
				["fuel"], ["temporary"], ["restore"]
			],
			"mach6": [
				["discipline"], ["inherent"], ["maladaptive"], ["predatory"], ["capitalism"], ["monument"],
				["triumph"], ["critical"], ["thoughtless"], ["secure"], ["pretender to wisdom"], ["shame"],
				["defeat"], ["argument"], ["literally"], ["opponent"], ["descendant"], ["ownership"],
				["countersignalling"], ["a point of honour"]
			],
			"mach7": [
				["trainers"], ["tech"], ["status"], ["atypical"], ["regard"], ["assistant"], ["high end"],
				["rate"], ["fur"], ["relativity"], ["fundamental"], ["principle"], ["make the point that"],
				["status"], ["measure"], ["relative to"], ["analysis"], ["extraordinary"], ["reveal"],
				["disappointment"]
			],
			"mach8": [
				["perceive"], ["better off"], ["automation"], ["appeal to"], ["eager"], ["misguided"], 
				["release"], ["perceive"], ["diminish"], ["present"], ["engagement"], ["consist of"], 
				["prescribed"], ["analyst"], ["restrict"], ["turn into"], ["routine"], ["take over"], 
				["time consuming"], ["engage in"]
			],
			"mach9": [
				["valid"], ["eye opening"], ["sound"], ["anecdote"], ["exaggeration"], ["manipulate"], 
				["navigator"], ["preconceived"], ["notion"], ["curse"], ["megadose"], ["promote"], 
				["cup of tea"], ["abound"], ["consequence"], ["erase"], ["impatient"], ["crisis"], 
				["mindful"], ["negatively"]
			],
			"mach10": [
				["affect"], ["complicated"], ["substantial"], ["imbalance"], ["premise"], ["opponent"], 
				["prompt"], ["mess up"], ["choke"], ["thigh"], ["current"], ["severely"], ["attachment"], 
				["toss"], ["downstream"], ["uncontrollable"], ["outcome"], ["hopelessly"], ["sociotechnical"], 
				["expertise"]
			]
	};
	

	var searchTypesKo = {
			"mach1": [
				["자산재산"], ["개선향상시키다"], ["가상설정"], ["편안한"], ["엄선한"], ["과장된"],
				["하기만하면"], ["보수개조하다"], ["간절히원하다"], ["동봉하다"], ["튼튼한"], ["분위기"],
				["신청"], ["헌신약속"], ["염려하는관심사"], ["적절하게"], ["방해혼란"], ["촉진승진시키다"],
				["애써노력하다"], ["느긋한편한"]
			],
			"mach2": [
				["연장선구내전화"], ["이해하고친해지다"], ["후임자대체물"], ["마땅히받을만하다"], ["주택의주거의"], ["세계적인유행병"],
				["처리하다"], ["고형의고체의"], ["승무원"], ["안전한"], ["영업대표담당자"], ["욕조통"],
				["너무큰"], ["규정"], ["터지다"], ["감사하다"], ["위로높이솟다"], ["정적고요"],
				["떨리다"], ["휙돌아가다"]
			],
			"mach3": [
				["눈속이다"], ["유령같은"], ["세차게두드리다"], ["빛나다빛내다"], ["지하실지하"], ["굉장히무서운"],
				["공포가엄습하다"], ["무도회댄스파티"], ["색깔이화려한"], ["축제사육제"], ["꼼짝달싹못하는"], ["부딪치다충돌하다"],
				["매우기쁜"], ["위풍당당하게"], ["인사하다"], ["현관"], ["하품하다"], ["이슬"],
				["향기냄새"], ["방울져서흐르다"]
			],
			"mach4": [
				["흐릿한희미한"], ["사라지다없어지다"], ["접함노출"], ["끝까지훑어보다"], ["믿음"], ["망치다"],
				["끝까지대충하는연습"], ["바로잡다"], ["연속으로"], ["흥분한"], ["굴복하다"], ["신경이곤두서다"],
				["좋지않은상태가되다"], ["에상관없이"], ["헌신적인"], ["근면한"], ["생산성"], ["우선순위"],
				["길안내하다"], ["선형의선적인"]
			],
			"mach5": [
				["비유적인"], ["소외시키다"], ["놓치다"], ["신경생물학의"], ["관점"], ["새로운맥락에적용하다"],
				["이전에"], ["보이지않는"], ["사용고용관여시키다"], ["방식"], ["자극하다"], ["연상연관"],
				["신경의"], ["연결망의교점접합점"], ["참여관여"], ["새롭게재해석하다"], ["발휘하다"], ["증가시키다"],
				["일시적인임시의"], ["회복시키다복구하다"]
			],
			"mach6": [
				["규율통제"], ["내재하는타고난"], ["적응하지못하는"], ["약탈하는탐욕스러운"], ["자본주의"], ["기념탑기념물"],
				["승리대성공"], ["위태로운위험한"], ["무분별한경솔한"], ["묶어놓다고정하다"], ["지혜가있는척하는사람"], ["창피모욕하다"],
				["패배시키다이기다"], ["논쟁토론"], ["그야말로문자그대로"], ["상대반대자"], ["자손후예유래한것"], ["소유"],
				["반대신호보내기"], ["명예에관한문제"]
			],
			"mach7": [
				["운동화"], ["과학기술"], ["지위"], ["이례적인격식벗어난"], ["호감존경"], ["점원조수"], ["최고급의"],
				["평가하다"], ["모피"], ["상대성"], ["기본적인"], ["원칙"], ["이라는주장하다"],
				["상태지위"], ["측정하다"], ["비교하여"], ["분석"], ["특별한"], ["밝히다드러내다"],
				["실망"]
			],
			"mach8": [
				["여기다인식하다"], ["상황이더나은"], ["자동화"], ["에호소하다"], ["열렬한간절히바라는"], ["잘못된오도된"], 
				["해방면제"], ["인식하다지각하다"], ["감소시키다"], ["나타내다제시하다"], ["개입참여"], ["으로구성되다"], 
				["규정된미리정해진"], ["분석가"], ["한정하다제한하다"], ["으로전환하다"], ["정례적인일"], ["떠맡다"], 
				["시간이걸리는"], ["하다에참여하다"]
			],
			"mach9": [
				["타당한유효한"], ["놀랄만한훌륭한"], ["괜찮은옳은"], ["일화"], ["과장"], ["조종하다"], 
				["정보검색자항해사"], ["사전에형성된"], ["개념생각"], ["저주"], ["대량투여하다"], ["조장하다장려하다"], 
				["선호하는일"], ["풍부하다"], ["결과"], ["지우다"], ["성급한"], ["위기"], 
				["염두에두는"], ["부정적으로"]
			],
			"mach10": [
				["영향미치다"], ["복잡한"], ["상당한"], ["불균형"], ["전제"], ["상대방"], 
				["하게하다부추기다"], ["망치다"], ["실패하다망치다"], ["허벅지"], ["흐름조류"], ["심하게심각하게"], ["애착"], 
				["뒤흔들다내던지다"], ["하류로흐름에따라"], ["통제할수없는"], ["결과"], ["대책없이"], ["사회기술적"], 
				["전문지식"]
			]
	};
	
	
	
	

	//variables to store game logic and it's view
	var game;
	var view;

	//instructions to display in h2 header
	var mainInstructions = "Search for the list of words inside the box and click-and-drag to select them!";

	//function call to start the word search game
	setUpWordSearch();

	/** randomly chooses a word theme and sets up the game matrix and the game 
	 * view to reflect that theme
	 */
	function setUpWordSearch() {

		//generates a random theme 
		var searchTypesArray = Object.keys(searchTypes); //converts theme object to array
		var searchTypesArrayKo = Object.keys(searchTypesKo); //converts theme object to array
		var randIndex = Math.floor(Math.random()*searchTypesArray.length); //generates random number/index
		var listOfWords = searchTypes[searchTypesArray[randIndex]]; //retrieves the matrix of words from random index
		var listOfWordsKo = searchTypesKo[searchTypesArrayKo[randIndex]]; 
		//console.log(listOfWordsKo);

		//converts letters to uppercase
		convertToUpperCase(listOfWords); 

		//sets the headings to reflect the instructions and themes
		updateHeadings(mainInstructions, searchTypesArray[randIndex]);

		//runs the logic of the game using a close of the word list (to avoid the actual object being altered)
		game = new WordSearchLogic(gameId, listOfWords.slice());
		game.setUpGame();

		//generates the view of the game and sets up mouse events for clicking and dragging
		view = new WordSearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId,listOfWordsKo,game.getWordLocations(),game.getMatrix());
		view.setUpView();
		view.triggerMouseDrag();

	}

	/** converts a given 2D array of words to all uppercase
	 *
	 * @param {String[][]} wordList a matrix of words to convert to uppercase
	 */
	function convertToUpperCase(wordList)  {

		for (var i = 0; i < wordList.length; i++) {

			for(var j = 0; j < wordList[i].length; j++) {

				wordList[i][j] = wordList[i][j].toUpperCase();

			}

		}

	}

	/** updates the instructions (h2) and theme (h3) headings according to the given
	 * text parameters
	 *
	 * @param {String} instructions text to set the h2 heading to
	 * @param {String} theme text to set the h3 theme element to
	 */
	function updateHeadings(instructions, theme) {

		$(instructionsId).text(instructions);
		$(themeId).text(theme);

	}

	/** solves the word search puzzle when the solve button is clicked
	 *
	 * @event WordSearchController#click
	 * @param {function} function to execute on mouse click
	 */
	$(solveId).click(function() {

		view.solve(game.getWordLocations(), game.getMatrix());

	});

	/** empties the game and list divs and replaces them with a new setup, modelling
	 * a 'refresh' effect when button is clicked
	 *
	 * @param {function} function to execute on mouse click to generate a new puzzle
	 */
	$(newGameId).click(function() {

		//empties the game and list elements, as well as the h3 theme span element
		$(gameId).empty();
		$(listId).empty();
		$(themeId).empty();

		//calls the set up to create a new word search game
		setUpWordSearch();

	})

}