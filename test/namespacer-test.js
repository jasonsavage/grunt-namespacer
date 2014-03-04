
//run tests


describe("Build Tests", function()
{
    it('app.js should exist', function() {
        expect(window).to.have.property('app');
        expect(app).to.be.an('object');
        expect(app).to.not.be.empty();
    });
    
});

describe("Namespace Tests", function()
{
    it('app.controls should not be null', function() {
        expect(app.controls).to.be.an('object');
    });
    it('app.model should not be null', function() {
        expect(app.model).to.be.an('object');
    });
    it('app.model.vo should not be null', function() {
        expect(app.model.vo ).to.be.an('object');
    });
    it('app.utils should not be null', function() {
        expect(app.utils).to.be.an('object');
    });
    
});

describe("Namespace Method/Class Tests", function()
{
    //-- app namespace
    describe("app namespace", function()
    {
        it('app should contain method init()', function() {
            expect(app).to.have.property('init');
            expect(app.init).to.be.a('function');
        });
            it('calling app.init() should return string "init"', function() {
                var res = app.init();
                expect(res).to.eql('init');
            });
    });
    
    //-- app.controls namespace
    describe("app.controls namespace", function()
    {
        it('app.controls should contain class method Checkbox()', function() {
            expect(app.controls).to.have.property('Checkbox');
            expect(app.controls.Checkbox).to.be.a('function');
        });
            it('calling new app.controls.Checkbox().result() should return string "Checkbox"', function() {
                var res = new app.controls.Checkbox();
                expect(res.result()).to.eql('Checkbox');
            });
        
        it('app.controls should contain class method CheckboxGroup()', function() {
            expect(app.controls).to.have.property('CheckboxGroup');
            expect(app.controls.CheckboxGroup).to.be.a('function');
        });
            it('calling new app.controls.CheckboxGroup().result() should return string "CheckboxGroup"', function() {
                var res = new app.controls.CheckboxGroup();
                expect(res.result()).to.eql('CheckboxGroup');
            });
        
        it('app.controls should not contain method _update()', function() {
            expect(app.controls).to.not.have.property('_update');
        });
            it('calling app.controls._update() should throw error', function() {
                expect(function() {
                    app.controls._update();
                }).to.throwError();
            });
            
            it('calling new app.controls.CheckboxGroup().update() should call _update() and return string "_update (hidden)"', function() {
                var res = new app.controls.CheckboxGroup();
                expect(res.update()).to.eql('_update (hidden)');
            });
        
        it('app.controls should not contain variable event_select_change', function() {
            expect(app.controls).to.not.have.property('event_select_change');
        });
            it('app.controls.event_select_change should be undefined', function() {
                expect(app.controls.event_select_change).to.eql(undefined);
            });
    });
    
    //-- app.model namespace
    describe("app.model namespace", function()
    {
        it('app.model should contain class method Cart()', function() {
            expect(app.model).to.have.property('Cart');
            expect(app.model.Cart).to.be.a('function');
        });
            it('call var cart = new app.model.Cart() should return an object', function() {
                var res = new app.model.Cart();
                expect(res).to.be.an('object');
            });
            it('calling cart.result() should return string "Cart"', function() {
                var res = new app.model.Cart();
                expect(res.result()).to.eql('Cart');
            });
            it('calling cart.count() should return number 0', function() {
                var res = new app.model.Cart();
                expect(res.count()).to.eql(0);
            });
        
        it('app.model should contain class method CartItem()', function() {
            expect(app.model).to.have.property('CartItem');
            expect(app.model.CartItem).to.be.a('function');
        });   
            it('call var item = new app.model.CartItem("ham", 2) should return an object', function() {
                var res = new app.model.CartItem("ham", 2);
                expect(res).to.be.an('object');
            });
            it('calling item.result() should return string "CartItem"', function() {
                var res = new app.model.CartItem("ham", 2);
                expect(res.result()).to.eql('CartItem');
            });
            it('calling item.name should return string "ham"', function() {
                var res = new app.model.CartItem("ham", 2);
                expect(res.name).to.eql('ham');
            });
        
        describe("app.model.vo namespace", function()
        {
            it('app.model.vo should contain class method Person()', function() {
                expect(app.model.vo).to.have.property('Person');
                expect(app.model.vo.Person).to.be.a('function');
            });     
                it('call var person = new app.model.vo.Person() should return an object ', function() {
                    var person = new app.model.vo.Person();
                    expect(person).to.be.an('object');
                });
                it('calling person.result() should return string "Person"', function() {
                    var person = new app.model.vo.Person();
                    expect(person.result()).to.eql('Person');
                });
                it('call var person = new app.model.vo.Jason() should return an object ', function() {
                    var person = new app.model.vo.Jason();
                    expect(person).to.be.an('object');
                });
                it('calling person.result() should return string "Jason"', function() {
                    var person = new app.model.vo.Jason();
                    expect(person.result()).to.eql('Jason');
                });
        });
    }); 
    
    //-- app.utils namespace
    describe("app.utils namespace", function()
    {
        it('app.utils should contain method contains()', function() {
            expect(app.utils).to.have.property('contains');
            expect(app.utils.contains).to.be.a('function');
        });  
        it('app.utils should not contain method _hideTest1()', function() {
            expect(app.utils).to.not.have.property('_hideTest1');
            expect(function() { app.utils._hideTest1(); }).to.throwError();
        });
        it('app.utils should not contain method _hideTest2()', function() {
            expect(app.utils).to.not.have.property('_hideTest2');
            expect(function() { app.utils._hideTest2(); }).to.throwError();
        });
        it('app.utils should contain method showTest()', function() {
            expect(app.utils).to.have.property('showTest');
            expect(app.utils.showTest).to.be.a('function');
        }); 
        it('app.utils should contain method empty()', function() {
            expect(app.utils).to.have.property('empty');
            expect(app.utils.empty).to.be.a('function');
        });   
        it('app.utils should contain method firstToUpper()', function() {
            expect(app.utils).to.have.property('firstToUpper');
            expect(app.utils.firstToUpper).to.be.a('function');
        });   
        it('app.utils should contain method substitute()', function() {
            expect(app.utils).to.have.property('substitute');
            expect(app.utils.substitute).to.be.a('function');
        });  
    });   
        
    
});