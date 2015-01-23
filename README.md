# node-red-contrib-odbc
Node for node-red to unixODBC and its supported drivers.

requirements
------------

* unixODBC binaries and development libraries for module compilation
  * on Ubuntu/Debian `sudo apt-get install unixodbc unixodbc-dev`
  * on OSX using macports.org `sudo port unixODBC`
* odbc drivers for target database
* properly configured odbc.ini and odbcinst.ini.

install
-------

After insuring that all requirements are installed you may install by one of the
two following options:

### npm

```bash
npm install node-red-contrib-odbc
```