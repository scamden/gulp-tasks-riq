###Gulp Tasks For RelateIQ Web Development

This readme documents aspects of the front end web build process.

**To release a version of a library:**

We follow semver so for non breaking changes you will run

`bump patch` from the library directory

Determining breaking changes can be tricky so ask yourself whether your change will break tests and whether any code you have written that uses it is necessary for it to work.

If you are pushing breaking changes run

`bump minor` (you can also use major here but that's a pretty rare occurence for major library refactors and releases)

