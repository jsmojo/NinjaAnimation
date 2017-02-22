myApp.directive('runAnime', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm) {

            var comboList = [combo1, combo2, combo3, combo4, combo5, combo6];
            var $kickass = $('.kickass');

            function combo1() {
                $kickass.addClass('punch').delay(700).queue(function(next){
                        $(this).removeClass('punch').addClass('kick').delay(700).queue(function(next){
                            $(this).removeClass('kick').addClass('punch').delay(700).queue(function(next){
                                $(this).removeClass('punch').addClass('kneelpunch').delay(700).queue(function(next){
                                    $(this).removeClass('kneelpunch');
                                    next();
                                });
                                next();
                            });
                            next();
                        });
                        next(); 
                    });
            }

            function combo2() {
                $kickass.addClass('kick').delay(700).queue(function(next){
                        $(this).removeClass('kick').addClass('swordslice').delay(700).queue(function(next){
                            $(this).removeClass('swordslice').addClass('backflip').animate({"left": $('.kickass').parent().width() - 240 }).delay(200).queue(function(next){
                                $(this).removeClass('backflip').addClass('ninjastar').delay(700).queue(function(next){
                                    $(this).removeClass('ninjastar');
                                    next();
                                });
                                next();
                            });
                            next();
                        });
                        next();
                    });
            }

            function combo3() {
                $kickass.addClass('swordslice').delay(700).queue(function(next){
                        $(this).removeClass('swordslice').addClass('kick').delay(700).queue(function(next){
                            $(this).removeClass('kick').addClass('backflip').animate({"left": $('.kickass').parent().width() - 240 }).delay(200).queue(function(next){
                                $(this).removeClass('backflip').addClass('ninjastar').delay(700).queue(function(next){
                                    $(this).removeClass('ninjastar');
                                    next();
                                });
                                next();
                            });
                            next();
                        });
                        next();
                    });
            }

            function combo4() {
                $kickass.addClass('kick').delay(700).queue(function(next){
                        $(this).removeClass('kick').addClass('backflip').animate({"left": $('.kickass').parent().width() - 240 }).delay(200).queue(function(next){
                            $(this).removeClass('backflip').addClass('ninjastar').delay(700).queue(function(next){
                                $(this).removeClass('ninjastar').addClass('ninjastar').delay(700).queue(function(next){
                                    $(this).removeClass('ninjastar');
                                    next();
                                });
                                next();
                            });
                            next();
                        });
                        next();
                    });
            }

            function combo5() {
                $kickass.addClass('jumpkick').delay(600).queue(function(next){
                        $(this).removeClass('jumpkick').addClass('backflip').animate({"left": $('.kickass').parent().width() - 240 }).delay(200).queue(function(next){
                            $(this).removeClass('backflip').addClass('ninjastar').delay(700).queue(function(next){
                                $(this).removeClass('ninjastar').addClass('ninjastar').delay(700).queue(function(next){
                                    $(this).removeClass('ninjastar');
                                    next();
                                });
                                next();
                            });
                           next();
                        });
                        next();
                    });
            }
            function combo6() {
                $kickass.addClass('kick').delay(700).queue(function(next){
                        $(this).removeClass('kick').addClass('groundkick').delay(700).queue(function(next){
                            $(this).removeClass('groundkick').addClass('lowkick').delay(500).queue(function(next){
                                $(this).removeClass('lowkick').addClass('kneelpunch').delay(700).queue(function(next){
                                    $(this).removeClass('kneelpunch');
                                    next();
                                });
                                next();
                            });
                            next();
                        });
                        next();
                    });
            }

            $elm.on('click', function(e) {
                e.preventDefault();

                var comboRanNum = Math.floor( (Math.random() * comboList.length));
                var combo = comboList[comboRanNum];
                var screenWidth = $kickass.parent().width();

                // console.log('combo : ' + combo);

                //disable all Code logo's on page
                $('.animeIconsCntr').append('<div class="animeDiableLayer"></div>');
                
                //display Code logo on battle page
                var competitionImage = $(this).find('img').attr('src');
                $('.competition').html('<img src="'+competitionImage+'"/>');

                //find attr from active click element
                var style = this.hash.substring(1);
                var duration = $(this).attr("data-duration");
                //alert(duration);

                //add action scene then walk
                //value should be default and then walk class to get ready to walk path
                $kickass.addClass(style).delay(1500).queue(function(next){
                    $(this).addClass('walk');
                    next();
                });
                
                //walk path and then do kickass combo and stop
                $kickass.animate({"left": screenWidth - 190 }, (screenWidth/800*1000), "linear" , function() {
                    $kickass.removeClass('walk');
                    combo();
                    $kickass.parent().delay(2500).queue(function(next){
                        $(this).append('<div class="explode"></div>').delay(2000).queue(function(next){
                            
                            $('.explode, .competition').fadeOut( "1000", function() {
                                $('.competition').html('').css('display', '');
                            });
                            $('.explode').remove();
                            next();
                        });
                        next();
                    });

                });

                //removes action added to start scene 
                setTimeout(function() {
                        $kickass.removeClass(style);
                }, duration);
                
                //walk path back home and animate movement
                setTimeout(function() {
                        $kickass.addClass('reversewalk');
                        $kickass.animate({"left": "20px"}, (screenWidth/800*1000), "linear" ).queue(function(next){
                            $(this).removeClass('reversewalk');
                            $(this).css('left', '');
                            $('.animeDiableLayer').remove();
                            next();
                        });
                        
                }, 7000); //time fighting, add amount of time for fight to end.
                
                //enable all Code logo's on page

            });
        }
    };
});

myApp.directive('singleActionAnime', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm) {

            $elm.on('click', function(e) {
                e.preventDefault();

                //find attr from active click element
                var $kickass = $('.kickass');
                var $rightEdge = $kickass.parent().width() - 180;
                var style = $(this).attr('data-fightClass');
                //console.log(style);
                var duration = $(this).attr("data-duration");
                var currentPosition = $('.kickass').css('left');
                var screenWidth = $kickass.parent().width();
                //console.log(currentPosition);

                if(currentPosition == 'auto') {
                    currentPosition = '15px';
                }
                currentPosition = parseInt((currentPosition), 10);
                //console.log(currentPosition);

                $kickass.addClass(style);

                if(style == 'jumpkick' || style == 'frontflip') {
                    if(currentPosition >= $rightEdge  ) {
                        $kickass.css('left', $rightEdge);
                    }
                    else {
                        $kickass.animate({"left": (currentPosition + 60) }, duration);
                    }
                }
                else if(style == 'backflip') {
                    if(parseInt((currentPosition), 10) <= 15  ) {
                        $kickass.css('left', '15px');
                    }
                    else {
                        $kickass.animate({"left": (currentPosition - 60) }, duration);
                    }
                }
                else if(style == 'ninjastar') {
                    $kickass.parent().delay(200).queue(function(next){
                        $(this).append('<div class="star"></div>');
                        $('.star').css('left', (currentPosition + 35) );
                        $('.star').animate({"left": $rightEdge + 132 }, (screenWidth/700*1000), "linear" ).queue(function(next){
                            $(this).removeClass();
                            next();
                        });
                        next();
                    });
                }
                
                //removes action added to scene 
                setTimeout(function() {
                        $kickass.removeClass(style);
                }, duration);
                
                             
                //enable all Code logo's on page

            });
        }
    };
});