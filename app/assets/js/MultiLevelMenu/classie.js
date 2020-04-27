/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg(className) {
  return new RegExp(`(^|\\s+)${className}(\\s+|$)`);
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
let hasClass;
let addClass;
let removeClass;

if (document.documentElement && 'classList' in document.documentElement) {
  hasClass = (elem, c) => elem.classList.contains(c);

  addClass = (elem, c) => {
    elem.classList.add(c);
  };

  removeClass = (elem, c) => {
    elem.classList.remove(c);
  };
} else {
  hasClass = (elem, c) => classReg(c).test(elem.className);

  addClass = (elem, c) => {
    const element = elem;
    if (!hasClass(elem, c)) {
      element.className += `  ${c}`;
    }
  };

  removeClass = (elem, c) => {
    const element = elem;
    element.className = elem.className.replace(classReg(c), ' ');
  };
}

function toggleClass(elem, c) {
  const fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
}

const classie = {
  // full names
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

export default classie;
