<template><div><h1 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> GIT常用命令</h1>
<p>方括号[]表示需要用户填写的信息，省略号...表示可重复类型添加</p>
<h2 id="创建-init" tabindex="-1"><a class="header-anchor" href="#创建-init" aria-hidden="true">#</a> 创建 init</h2>
<ul>
<li><code v-pre>git init</code>  在当前目录新建一个Git代码库</li>
<li><code v-pre>git init [project-name]</code> 新建一个目录，将其初始化为Git代码库</li>
<li><code v-pre>git clone [url]</code>  下载一个项目和它的整个代码历史</li>
</ul>
<h2 id="配置-config" tabindex="-1"><a class="header-anchor" href="#配置-config" aria-hidden="true">#</a> 配置 config</h2>
<ul>
<li><code v-pre>git config --list</code>  显示当前的Git配置</li>
<li><code v-pre>git config -e [--global]</code> 编辑Git配置文件</li>
<li><code v-pre>git config [--global] user.name &quot;[name]&quot;</code>  设置提交代码时的用户信息</li>
</ul>
<h2 id="增加-删除-add-rm" tabindex="-1"><a class="header-anchor" href="#增加-删除-add-rm" aria-hidden="true">#</a> 增加/删除 add/rm</h2>
<ul>
<li><code v-pre>git add [file1] [file2] ...</code>  添加指定文件到暂存区</li>
<li><code v-pre>git add [dir]</code> 添加指定目录到暂存区，包括子目录</li>
<li><code v-pre>git add .</code>  添加当前目录的所有文件到暂存区</li>
<li><code v-pre>git add -p</code>  添加每个变化前，都会要求确认</li>
<li><code v-pre>git rm [file1] [file2] ...</code>  添加每个变化前，都会要求确认</li>
<li><code v-pre>git rm --cached [file]</code>  添加每个变化前，都会要求确认</li>
<li><code v-pre>git rm  -p</code>  添加每个变化前，都会要求确认</li>
<li><code v-pre>git rm  -p</code>  添加每个变化前，都会要求确认</li>
</ul>
<h2 id="提交-commit" tabindex="-1"><a class="header-anchor" href="#提交-commit" aria-hidden="true">#</a> 提交 commit</h2>
<ul>
<li><code v-pre>git commit -m [message]</code>  提交暂存区到仓库区</li>
<li><code v-pre>git commit [file1] [file2] ... -m [message]</code>  提交暂存区的指定文件到仓库区</li>
<li><code v-pre>git commit -a</code>  提交工作区自上次commit之后的变化，直接到仓库区</li>
<li><code v-pre>git commit -v</code>  提交时显示所有diff信息</li>
<li><code v-pre>git commit --amend -m [message]</code>  使用一次新的commit，替代上一次提交</li>
<li><code v-pre>git commit --amend [file1] [file2] ...</code>  重做上一次commit，并包括指定文件的新变化</li>
</ul>
<h2 id="分支-branch" tabindex="-1"><a class="header-anchor" href="#分支-branch" aria-hidden="true">#</a> 分支 branch</h2>
<ul>
<li><code v-pre>git branch</code>  列出所有本地分支</li>
<li><code v-pre>git branch -r</code>  列出所有远程分支</li>
<li><code v-pre>git branch -a</code>  列出所有本地分支和远程分支</li>
<li><code v-pre>git branch [branch-name]</code>  新建一个分支，但依然停留在当前分支</li>
<li><code v-pre>git branch -d [branch-name]</code>  删除分支</li>
<li><code v-pre>git branch [branch] [commit]</code>  新建一个分支，指向指定commit</li>
<li><code v-pre>git branch --track [branch] [remote-branch]</code>  新建一个分支，与指定的远程分支建立追踪关系</li>
<li><code v-pre>git branch --set-upstream [branch] [remote-branch]</code>  建立追踪关系，在现有分支与指定的远程分支之间</li>
<li><code v-pre>git branch -dr [remote/branch]</code>  删除远程分支</li>
<li><code v-pre>git merge [branch]</code>  合并指定分支到当前分支</li>
</ul>
<h2 id="检出-checkout" tabindex="-1"><a class="header-anchor" href="#检出-checkout" aria-hidden="true">#</a> 检出 checkout</h2>
<ul>
<li><code v-pre>git checkout -</code>  切换到上一个分支</li>
<li><code v-pre>git checkout -b [branch] origin/[remote-branch]</code>  以远程分支为基础新建一个分支，并切换到该分支</li>
<li><code v-pre>git checkout [branch-name]</code>  切换到指定分支，并更新工作区</li>
</ul>
<h2 id="同步-fetch-pull-push" tabindex="-1"><a class="header-anchor" href="#同步-fetch-pull-push" aria-hidden="true">#</a> 同步  fetch/pull/push</h2>
<ul>
<li><code v-pre>git fetch [remote]</code> 下载远程仓库的所有变动</li>
<li><code v-pre>git remote -v</code>  显示所有远程仓库</li>
<li><code v-pre>git remote show [remote]</code>  显示某个远程仓库的信息</li>
<li><code v-pre>git remote add [shortname] [url]</code> 增加一个新的远程仓库，并命名</li>
<li><code v-pre>git pull [remote] [branch]</code>  取回远程仓库的变化，并与本地分支合并</li>
<li><code v-pre>git push [remote] [branch]</code> 上传本地指定分支到远程仓库</li>
<li><code v-pre>git push [remote] --force</code> 强行推送当前分支到远程仓库，即使有冲突</li>
<li><code v-pre>git push [remote] --all</code>  推送所有分支到远程仓库</li>
</ul>
<h2 id="查看-log" tabindex="-1"><a class="header-anchor" href="#查看-log" aria-hidden="true">#</a> 查看 log</h2>
<ul>
<li><code v-pre>git status</code> 显示有变更的文件</li>
<li><code v-pre>git log</code> 显示当前分支的版本历史</li>
<li><code v-pre>git log --stat</code> 显示commit历史，以及每次commit发生变更的文件</li>
<li><code v-pre>git diff</code> 显示暂存区和工作区的差异</li>
<li><code v-pre>git diff HEAD</code> 显示工作区与当前分支最新commit之间的差异</li>
<li><code v-pre>git reflog</code> 显示当前分支的最近几次提交</li>
</ul>
<h2 id="撤销" tabindex="-1"><a class="header-anchor" href="#撤销" aria-hidden="true">#</a> 撤销</h2>
<ul>
<li><code v-pre>git checkout .</code> 恢复暂存区的所有文件到工作区</li>
<li><code v-pre>git checkout [file]</code> 恢复暂存区的指定文件到工作区</li>
<li><code v-pre>git checkout [commit] [file]</code> 恢复某个commit的指定文件到暂存区和工作区</li>
<li><code v-pre>git reset [file]</code> 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变</li>
<li><code v-pre>git reset --hard</code> 重置暂存区与工作区，与上一次commit保持一致</li>
<li><code v-pre>git reset [commit]</code> 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变</li>
<li><code v-pre>git reset --hard [commit]</code> 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致</li>
<li><code v-pre>git revert [commit]</code> 新建一个commit，用来撤销指定commit</li>
</ul>
<h2 id="恢复远程分支" tabindex="-1"><a class="header-anchor" href="#恢复远程分支" aria-hidden="true">#</a> 恢复远程分支</h2>
<ol>
<li>备份一个本地分支 <code v-pre>git branch [branch-name]</code></li>
<li>同步远程分支 <code v-pre>git pull [remote] [branch]</code></li>
<li>恢复到正确的版本  <code v-pre>git reset --hard</code> （哈希值如：git reset --hard 4154ad86d9548ac51f6992f3a7e8ba3f9a24b42a）</li>
<li>强推远程仓库 <code v-pre>git push [remote] --force</code></li>
</ol>
</div></template>


