# Running the Website

Orginally I completely removed an out of date dependancy that was breaking the npm install
    - use-delayed-render 0.0.7 expected an older react version

But this then ended up breaking the start up of the website, because the MobileNavbar.tsx still used it.

So I then switched this to 