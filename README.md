# node-red-contrib-odbc
Node for Node-RED to unixODBC and its supported drivers.
Based on node-odbc https://github.com/wankdanker/node-odbc 

Requirements
------------

* unixODBC binaries and development libraries for module compilation
  * on Ubuntu/Debian `sudo apt-get install unixodbc unixodbc-dev`
  * on OSX using macports.org `sudo port unixODBC`
* odbc drivers for target database
* properly configured odbc.ini and odbcinst.ini.
Expample of odbcinst.ini
```bash
	[PostgreSQL]
	Description=ODBC for PostgreSQL
	Driver=/usr/lib/psqlodbc.so
	Setup=/usr/lib/libodbcpsqlS.so
	Driver64=/usr/lib64/psqlodbc.so
	Setup64=/usr/lib64/libodbcpsqlS.so
	FileUsage=1

	[MySQL]
	Description=ODBC for MySQL
	Driver=/usr/lib/libmyodbc5.so
	Setup=/usr/lib/libodbcmyS.so
	Driver64=/usr/lib64/libmyodbc5.so
	Setup64=/usr/lib64/libodbcmyS.so
	FileUsage=1

	[FreeTDS]
	Description=ODBC for MS SQL
	Driver=/usr/lib64/libtdsodbc.so.0

	[MSSQL]
	Description=Microsoft ODBC Driver 11 for SQL Server
	Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-11.0.so.2270.0
	Threading=1
	UsageCount=1
```
Install
-------

After insuring that all requirements are installed run the following command in the root directory of your Node-RED install

```bash
npm install node-red-contrib-odbc
```