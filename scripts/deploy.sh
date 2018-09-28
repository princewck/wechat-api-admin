npm run build && \
ssh ssd "[ -d /home/admin_temp ] && echo ok || mkdir -p /home/admin_temp" && \
scp -r ./dist/* ssd:/home/admin_temp && \
ssh ssd "[ -d /home/admin ] && rm -rf /home/admin || echo admin not exist && mv /home/admin_temp /home/admin" && \
echo 发布成功


