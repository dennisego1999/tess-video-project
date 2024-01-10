@servers(['production' => 'tessegocom@ssh.tessego.com'])

@setup
    // Configuration
    switch ($env) {
        default:
            $confirm = true;
            $branch = 'main';
            $server = 'production';
    }

    // Environments
    switch ($env) {
        default:
            $dir = "subsites/tessego.com";
        break;
    }
@endsetup

{{-- TASKS --}}

@task('deploy', ['on' => $server, 'confirm' => $confirm])
    cd
    cd {{ $dir }}
    git fetch --prune
    git stash
    git stash clear
    git pull origin {{ $branch }}
    @if ($build)
        yarn
        yarn build
    @endif
@endtask

@error
    echo $task;
    exit;
@enderror
