import type { CommandHelp } from "../help.ts";

export const completionHelp: CommandHelp = {
  name: "completion",
  usage: "phantom completion <shell>",
  description: "Generate shell completion scripts for fish, zsh, or bash",
  examples: [
    {
      command: "phantom completion fish | source",
      description:
        "Load Fish completion (add to ~/.config/fish/config.fish for persistence)",
    },
    {
      command: 'eval "$(phantom completion zsh)"',
      description: "Load Zsh completion (add to .zshrc for persistence)",
    },
    {
      command: 'eval "$(phantom completion bash)"',
      description: "Load Bash completion (add to .bashrc for persistence)",
    },
    {
      command: 'phantom completion powershell | Out-String | Invoke-Expression',
      description: "Load PowerShell completion (add to your PowerShell profile for persistence)",
    },
  ],
  notes: [
    "Supported shells: fish, zsh, bash, powershell",
    "For Fish: add the source command to ~/.config/fish/config.fish for persistence",
    "For Zsh: add the eval command to your .zshrc for persistence",
    "For Bash: requires bash-completion v2, add the eval command to your .bashrc for persistence",
    "For PowerShell (pwsh): run `phantom completion powershell | Out-String | Invoke-Expression` to load into the current session, or append the output to your $PROFILE for persistence",
  ],
};
