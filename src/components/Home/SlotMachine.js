import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { yelpResults } from '../../actions/mealMatch'
import cuisineTypes from '../../actions/cuisineTypes'
import bento from '../../images/bento.png'
import chinese from  '../../images/chinese.png'
import egg from '../../images/egg.png'
import fish from '../../images/fish.png'
import hamburger from '../../images/hamburger.png'
import pho from '../../images/noodles.png'
import pizza from '../../images/pizza.png'
import sandwich from '../../images/sandwich.png'
import spaghetti from '../../images/spaghetti.png'
import taco from '../../images/taco.png'
import './slot.css'
import $ from 'jquery'

var startSeqs = {};
var startNum = 0;

// jQuery FN
$.fn.playSpin = function (options) {
    if (this.length) {
        if ($(this).is(':animated')) return; // Return false if this element is animating
        startSeqs['mainSeq' + (++startNum)] = {};
        $(this).attr('data-playslot', startNum);

        var total = this.length;
        var thisSeq = 0;

        // Initialize options
        if (typeof options == 'undefined') {
            options = {};
        }

        // Pre-define end nums
        var endNums = [];
        if (typeof options.endNum != 'undefined') {
            if ($.isArray(options.endNum)) {
                endNums = options.endNum;
            } else {
                endNums = [options.endNum];
            }
        }

        for (var i = 0; i < this.length; i++) {
            if (typeof endNums[i] == 'undefined') {
                endNums.push(0);
            }
        }

        startSeqs['mainSeq' + startNum]['totalSpinning'] = total;
        return this.each(function () {
            options.endNum = endNums[thisSeq];
            startSeqs['mainSeq' + startNum]['subSeq' + (++thisSeq)] = {};
            startSeqs['mainSeq' + startNum]['subSeq' + thisSeq]['spinning'] = true;
            var track = {
                total: total,
                mainSeq: startNum,
                subSeq: thisSeq
            };
            (new slotMachine(this, options, track));
        });
    }
};

$.fn.stopSpin = function () {
    if (this.length) {
        if (!$(this).is(':animated')) return; // Return false if this element is not animating
        if ($(this)[0].hasAttribute('data-playslot')) {
            $.each(startSeqs['mainSeq' + $(this).attr('data-playslot')], function(index, obj) {
                obj['spinning'] = false;
            });
        }
    }
};

var slotMachine = function (el, options, track) {
    var slot = this;
    slot.$el = $(el);

    slot.defaultOptions = {
        easing: 'swing',        // String: easing type for final spin
        time: 2000,             // Number: total time of spin animation
        loops: 4,               // Number: times it will spin during the animation
        manualStop: false,      // Boolean: spin until user manually click to stop
        stopSeq: 'random',      // String: sequence of slot machine end animation, random, leftToRight, rightToLeft
        endNum: 0,              // Number: animation end at which number/ sequence of list
        onEnd : $.noop,         // Function: run on each element spin end, it is passed endNum
        onFinish: $.noop        // Function: run on all element spin end, it is passed endNum
    };

    slot.spinSpeed = 0;
    slot.loopCount = 0;

    slot.init = function () {
        slot.options = $.extend({}, slot.defaultOptions, options);
        slot.setup();
        slot.startSpin();
    };

    slot.setup = function () {
        var $li = slot.$el.find('li').first();
        slot.liHeight = $li.innerHeight();
        slot.liCount = slot.$el.children().length;
        slot.listHeight = slot.liHeight * slot.liCount;
        slot.spinSpeed = slot.options.time / slot.options.loops;

        $li.clone().appendTo(slot.$el); // Clone to last row for smooth animation

        // Configure stopSeq
        if (slot.options.stopSeq === 'leftToRight') {
            if (track.subSeq !== 1) {
                slot.options.manualStop = true;
            }
        } else if (slot.options.stopSeq === 'rightToLeft') {
            if (track.total !== track.subSeq) {
                slot.options.manualStop = true;
            }
        }
    };

    slot.startSpin = function () {
        slot.$el
            .css('top', -slot.listHeight)
            .animate({'top': '0px'}, slot.spinSpeed, 'linear', function () {
                slot.lowerSpeed();
            });
    };

    slot.lowerSpeed = function () {
        slot.loopCount++;

        if (slot.loopCount < slot.options.loops ||
            (slot.options.manualStop && startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['spinning'])) {
            slot.startSpin();
        } else {
            slot.endSpin();
        }
    };

    slot.endSpin = function () {
        if (slot.options.endNum === 0) {
            slot.options.endNum = slot.randomRange(1, slot.liCount);
        }

        // Error handling if endNum is out of range
        if (slot.options.endNum < 0 || slot.options.endNum > slot.liCount) {
            slot.options.endNum = 1;
        }

        var finalPos = -((slot.liHeight * slot.options.endNum) - slot.liHeight);
        var finalSpeed = ((slot.spinSpeed * 1.5) * (slot.liCount)) / slot.options.endNum;

        slot.$el
            .css('top', -slot.listHeight)
            .animate({'top': finalPos}, finalSpeed, slot.options.easing, function () {
                slot.$el.find('li').last().remove(); // Remove the cloned row

                slot.endAnimation(slot.options.endNum);
                if ($.isFunction(slot.options.onEnd)) {
                    slot.options.onEnd(slot.options.endNum);
                }

                // onFinish is every element is finished animation
                if (startSeqs['mainSeq' + track.mainSeq]['totalSpinning'] === 0) {
                    var totalNum = '';
                    $.each(startSeqs['mainSeq' + track.mainSeq], function(index, subSeqs) {
                        if (typeof subSeqs == 'object') {
                            totalNum += subSeqs['endNum'].toString();
                        }
                    });
                    if ($.isFunction(slot.options.onFinish)) {
                        slot.options.onFinish(totalNum);
                    }
                }
            });
            setTimeout(() => { 
              $("#randomRestaurant1").css('display', 'block');
              $("#randomRestaurant2").css('display', 'block');
              $("#randomRestaurant3").css('display', 'block');
            }, 1000);
    }

    slot.endAnimation = function(endNum) {
        if (slot.options.stopSeq === 'leftToRight' && track.total !== track.subSeq) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq + 1)]['spinning'] = false;
        } else if (slot.options.stopSeq === 'rightToLeft' && track.subSeq !== 1) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq - 1)]['spinning'] = false;
        }
        startSeqs['mainSeq' + track.mainSeq]['totalSpinning']--;
        startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['endNum'] = endNum;
        
    }

    slot.randomRange = function (low, high) {
        return Math.floor(Math.random() * (1 + high - low)) + low;
    };

    this.init();
};
 

class SlotM extends Component {    
  constructor() {
    super()
    this.state = {
      randomRest: true,
      number: Math.floor((Math.random() * 10))
    }
  }

  componentDidMount(){
    this.randomRestaurant();
  }

  componentDidUpdate(){
    this.randomRestaurant();
  }
  
  clickEvent(){
    $("#randomRestaurant1").css('display', 'none');
    $("#randomRestaurant2").css('display', 'none');
    $("#randomRestaurant3").css('display', 'none');
      $('#example6 ul').playSpin();
      let restuarant = this.props.yelpBusinesses[this.state.number].name;
      let restaurantAd1 = this.props.yelpBusinesses[this.state.number].location.display_address[0];
      let restaurantAd2 = this.props.yelpBusinesses[this.state.number].location.display_address[1];
      let googleAddress = 'http://maps.google.com/maps?q=';
      googleAddress += restaurantAd1.replace(/ /g, "+");
      googleAddress += ",+";
      googleAddress += restaurantAd2.replace(/ /g, "+");
      $("#randomRestaurant1").text(restuarant);
      $("#randomRestaurant2").text(restaurantAd1);
      $("#randomRestaurant3").text(restaurantAd2);
      $("#a-href").attr("href", googleAddress)
      this.setState({
        randomRest: true
      })
  }

  randomRestaurant(){
    if(this.state.randomRest === true){
      this.setState({
        randomRest: false,
        number: Math.floor((Math.random() * 10))
      })
      let cuisine = cuisineTypes[this.state.number].value;
      console.log(this.state.number);
      console.log(cuisine);
      const yelpData= { 
        location: '08108',
        term: cuisine,
      }
      this.props.yelpResults(yelpData);
    }
}
  
      render(){

        return(
          <div>
                <div className="slotwrapper" id="example6">
                    <ul>
                        <li><img src={bento} alt="bento"/></li>
                        <li><img src={chinese} alt="chinese"/></li>
                        <li><img src={egg} alt="egg"/></li>
                        <li><img src={fish} alt="fish"/></li>
                        <li><img src={hamburger} alt="hamburger"/></li>
                        <li><img src={pho} alt="pho"/></li>
                        <li><img src={pizza} alt="pizza"/></li>
                        <li><img src={sandwich} alt="sandwich"/></li>
                        <li><img src={spaghetti} alt="spaghetti"/></li>
                        <li><img src={taco} alt="taco"/></li>
                    </ul>
                    <ul>
                        <li><img src={pho} alt="pho"/></li>
                        <li><img src={bento} alt="bento"/></li>
                        <li><img src={chinese} alt="chinese"/></li>
                        <li><img src={egg} alt="egg"/></li>
                        <li><img src={fish} alt="fish"/></li>
                        <li><img src={hamburger} alt="hamburger"/></li>
                        <li><img src={pizza} alt="pizza"/></li>
                        <li><img src={sandwich} alt="sandwich"/></li>
                        <li><img src={spaghetti} alt="spaghetti"/></li>
                        <li><img src={taco} alt="taco"/></li>
                    </ul>
                    <ul>
                        <li><img src={taco} alt="taco"/></li>
                        <li><img src={bento} alt="bento"/></li>
                        <li><img src={chinese} alt="chinese"/></li>
                        <li><img src={egg} alt="egg"/></li>
                        <li><img src={fish} alt="fish"/></li>
                        <li><img src={hamburger} alt="hamburger"/></li>
                        <li><img src={pho} alt="pho"/></li>
                        <li><img src={pizza} alt="pizza"/></li>
                        <li><img src={sandwich} alt="sandwich"/></li>
                        <li><img src={spaghetti} alt="spaghetti"/></li>
                    </ul>
                </div>
                <div>
                    <button type="button" className="rc-menu-button" id="btn-example6" onClick={() => this.clickEvent()} >Pick a Random Meal</button>

                    <h4 className="hidden" id="randomRestaurant1">Restaurant Placeholder 1</h4>  

                    <a id="a-href" href="http://maps.google.com/maps?q=313+N+Plankinton+Ave,+Milwaukee,+WI+53203" target="_blank" rel="noreferrer">
                    <h5 className="hidden" id="randomRestaurant2">Restaurant Placeholder 2</h5>  
                    <h5 className="hidden" id="randomRestaurant3">Restaurant Placeholder 3</h5>
                    </a>
                </div>
        </div>
        )
      }

    }


    const mapDispatchToProps = dispatch => {
      return {    
        yelpResults: data => dispatch(yelpResults(data)),
      }
    }
    
    SlotM.propTypes = {
      yelpResults: PropTypes.func.isRequired,
    };
    
    const mapStateToProps = (state) => ({
      yelpBusinesses: state.mealMatchReducer.info,
    })
    
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(SlotM);