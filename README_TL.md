## Setup Live Reload

Use screen command to let the `yarn start` session run in the detached terminal
``` bash
# only run once
screen -S docusaurus
# inside the screen, type in
./loop_start.sh
```

- Use Ctrl+A then Ctrl+D to detach the terminal
- Type `screen -r` to re-attach the terminal

## Add Offline Search Capabilities

Package available at:
https://github.com/lelouch77/docusaurus-lunr-search

``` bash
yarn add docusaurus-lunr-search

# copy theme files to src
yarn swizzle docusaurus-lunr-search SearchBar
```

add `plugins: [require.resolve('docusaurus-lunr-search')],` in `docusaurus.config.js` section `module.exports`.


## Using `cron` to Schedule Daily `yarn build`

### Setup
Start the `crontab` editor, using the current UNIX account:

``` bash
# run as current user
crontab -e
```

Type in the following (which asks the command to be run at 12:30 and 0:30)

``` bash
# crontab -e
SHELL=/bin/bash
#MAILTO=root@example.com
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed


30 12 * * * /home/tsluser/docusaurus_html/tl-tech-details/cron_build.sh
30 0 * * * /home/tsluser/docusaurus_html/tl-tech-details/cron_build.sh

# check for error at /var/log/cron
```

### Logs
- Check the cron log at `/var/log/cron`
- Check the `stdout` at `/var/spool/mail/tsluser`

